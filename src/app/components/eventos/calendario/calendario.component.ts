import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list"
import { CalendarioService } from '../../../services/calendarios/calendario.service';
import { Eventos } from '../../../interfaces/eventos';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  title: string = 'Calendario de eventos';

  eventos: EventInput[] = [
    { title: 'Evento del trabajo', date: '2024-11-10' },
    { title: 'Evento del ocio', date: '2024-11-12' }
  ]

  calendarVisible = signal<boolean>(true)
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin, 
      timeGridPlugin,
      listPlugin
    ],
    headerToolbar:{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable:true,
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateClick.bind(this), //agrega eventos
    eventClick: this.handleEventClick.bind(this), //elimina eventos
    eventsSet: this.handleEvents.bind(this) //actualiza eventos
  });

  currentEvents = signal<EventApi[]>([])

  constructor(private changeDetector: ChangeDetectorRef, private calendarioService: CalendarioService){}

  ngOnInit(): void {
    this.loadEventos()

  }

    loadEventos(){

      this.calendarioService.getEventos().subscribe((events) => {
        
        this.eventos = events.map((evento) => ({
          id: evento.id?.toString(),
          title: evento.titulo,
          start: evento.inicio,
          end: evento.fin,
          description: evento.descripcion,

    }));
    this.calendarOptions.update(options =>({
      ...options,
      events:this.eventos
    }))
    })
    }
  
  handleCalendarToogle(){
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle(){
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends
    }))
  }

  handleDateClick(selectInfo:DateSelectArg) {
    const title = prompt ('Introduce el titulo del evento');
    const description = prompt ('Introduce una pequeña descripcion del evento') ?? ''; //asigna campo vacio en el caso que sea nulo
    const finEventStr = prompt ('Introduce la fecha de finalizacion en formado (yyy-mm-dd)') ?? ''; //asigna campo vacio en el caso que sea nulo
    const finEvent = new Date(finEventStr)
    const calendarApi = selectInfo.view.calendar
    calendarApi.unselect();

    if(title){
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

handleEventClick(clickInfo: EventClickArg) {
  if(confirm(`¿Seguro quiere eliminar el evento ${clickInfo.event.title}`)){
    clickInfo.event.remove()
  }

}

handleEvents(){

}



 

}
