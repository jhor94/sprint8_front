import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list"
import { CalendarioService } from '../../../services/calendarios/calendario.service';
import { Eventos } from '../../../interfaces/eventos';

//bootstrap
//import * as bootstrap from 'bootstrap'



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  title: string = 'Calendario de eventos';

  eventos: EventInput[] = []

  calendarVisible = signal<boolean>(true)
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin
    ],
    height:'auto',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateClick.bind(this), //agrega eventos
    eventClick: this.handleEventClick.bind(this), //elimina eventos
  });

  currentEvents = signal<EventApi[]>([])

  constructor(private changeDetector: ChangeDetectorRef, private calendarioService: CalendarioService) { }

  ngOnInit(): void {
    this.loadEventos()
  }

  //actualizar todos los eventos del calendario
  loadEventos() {
    this.calendarioService.getEventos().subscribe((events) => {
      this.eventos = events.map((evento) => ({
        id: evento.id?.toString(),
        title: evento.titulo,
        start: evento.inicio,
        end: evento.fin,
        description: evento.descripcion,

      }));
      this.calendarOptions.update(options => ({
        ...options,
        events: this.eventos
      }))
    })
  }

  handleCalendarToogle() {// mostrar o ocultar el calendario
    this.calendarVisible.update((bool) => !bool);
  }

  //headel para crear
  handleDateClick(selectInfo: DateSelectArg) {
    const title = prompt('Introduce el titulo del evento');
    const description = prompt('Introduce una pequeña descripcion del evento') ?? ''; //asigna campo vacio en el caso que sea nulo
    const finEventStr = prompt('Introduce la fecha de finalizacion en formado (yyy-mm-dd)') ?? ''; //asigna campo vacio en el caso que sea nulo
    const finEvent = new Date(finEventStr)
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect();

    if (title) {
      const nuevoEvento: Eventos = {
        titulo: title,
        inicio: new Date(selectInfo.startStr),
        fin: finEvent,
        descripcion: description,
        creado_en: new Date(),
        actualizado_en: new Date()
      };
      this.calendarioService.guardarEvento(nuevoEvento).subscribe((evento) => {
        this.loadEventos()
        calendarApi.addEvent({
          id: evento.id?.toString(),
          title: evento.titulo,
          start: evento.inicio,
          end: evento.fin,
          description: evento.descripcion,
        })
      })

    }

  }

  eventoSeleccionado: EventClickArg | null = null

  //evento ya creados
  handleEventClick(clickInfo: EventClickArg) {
    this.eventoSeleccionado = clickInfo
  //  const modal = new bootstrap.Modal(document.getElementById('eventoModal')!);
   // modal.show()
    document.getElementById('eventoTitulo')!.innerHTML = clickInfo.event.title
  }
  // headel para borrar
  borrarEvento() {

    const eventoId = Number(this.eventoSeleccionado?.event.id)

    if (eventoId) {
      if (confirm(`¿Seguro quiere eliminar el evento ${this.eventoSeleccionado?.event.title}`)) {
        this.calendarioService.deleteEvento(eventoId).subscribe(() => {
          this.eventoSeleccionado?.event.remove()
          this.eventoSeleccionado = null
        })
      }
    }
   // bootstrap.Modal.getInstance(document.getElementById('eventoModal')!)?.hide()
  }
  //headel para actualizar
  actualizarEvento() {
    if (this.eventoSeleccionado) {
      const newTitle = prompt('Actualiza el titulo del evento', this.eventoSeleccionado?.event.title) ?? this.eventoSeleccionado?.event.title
      const newDescription = prompt('Actualizac la descripción', this.eventoSeleccionado?.event.extendedProps['description']) ?? this.eventoSeleccionado?.event.extendedProps['description']

      const originalCreationDate = this.eventoSeleccionado?.event.extendedProps['creado_en'] || this.eventoSeleccionado?.event.start;

      const UpdateEvent: Eventos = {
        id: Number(this.eventoSeleccionado.event.id),
        titulo: newTitle,
        inicio: this.eventoSeleccionado.event.start!,
        fin: this.eventoSeleccionado.event.end!,
        descripcion: newDescription,
        creado_en: originalCreationDate,
        actualizado_en: new Date()
      }

      this.calendarioService.updateEvento(UpdateEvent.id!, UpdateEvent).subscribe(() => {// paso el id por parametro y pongo !para evitar el null
        this.eventoSeleccionado!.event.setProp('title', newTitle);
        this.eventoSeleccionado!.event.setProp('description', newDescription);
        this.eventoSeleccionado = null
      })
    //  bootstrap.Modal.getInstance(document.getElementById('eventoModal')!)?.hide()

    }
  }
}

