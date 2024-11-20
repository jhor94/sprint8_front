import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list"
import { CalendarioService } from '../../../services/calendarios/calendario.service';
import { Eventos } from '../../../interfaces/eventos';

//bootstrap
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Colors } from 'chart.js';



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  @ViewChild('eventoModal') eventoModal!: TemplateRef<any>
  @ViewChild('confirmacionModal') confirmacionModal!: TemplateRef<any> 
  title: string = 'Calendario de eventos';
  formModal: FormGroup = new FormGroup({})
  editado:boolean = false
  selectedEventId : number | null = null

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

  constructor(private changeDetector: ChangeDetectorRef, private calendarioService: CalendarioService, private modalService: NgbModal, private form: FormBuilder, private toastr: ToastrService) {
   
   }

  ngOnInit(): void {
    this.loadEventos()
    this.formularioEventos()
  }

  formularioEventos(){
    this.formModal = this.form.group({
      titulo: ['', Validators.required],
      inicio: ['',  Validators.required],
      fin: ['',  Validators.required],
      descripcion: ['', Validators.required],
      color:['']
    })
  }

  //actualizar todos los eventos del calendario
  loadEventos() {
    this.calendarioService.getEventos().subscribe((events) => {
      this.eventos = events.map((evento) => ({
        id: evento.id?.toString(),
        title: evento.titulo,
        start: evento.inicio,
        end: evento.fin,
        extendedProps:{
          description: evento.descripcion ?? '',
        },
        color: evento.color
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

  //headel para crear dentro del calendario
  handleDateClick(selectInfo: DateSelectArg) {
    this.editado = false
    this.selectedEventId = null
    this.formModal.reset()
    this.formModal.patchValue({
      inicio: selectInfo.startStr,
      fin:selectInfo.endStr
    });
    this.modalService.open(this.eventoModal, {ariaLabelledBy: 'eventoModalLabel'})
  }

  eventoSeleccionado: EventClickArg | null = null

  //evento ya creados
  handleEventClick(clickInfo: EventClickArg) {
    this.editado = true;
    this.selectedEventId = Number(clickInfo.event.id);
    this.formModal.patchValue({
      titulo: clickInfo.event.title,
      inicio: clickInfo.event.start?.toISOString().split('T')[0] || '',
      fin: clickInfo.event.end?.toISOString().split('T')[0] || '',
      descripcion: clickInfo.event.extendedProps['description'],
      color: clickInfo.event.backgroundColor || '#1a6363'
    })
    this.modalService.open(this.eventoModal, {ariaLabelledBy: 'eventoModalLabel'})
  }


  generarEvento(){

    if(this.formModal.valid){
      const colorEvento = this.formModal.value.color || '##1a6363'
      const nuevoEvento: Eventos = {
        id: this.editado ? this.selectedEventId! : undefined,
        titulo:this.formModal.value.titulo,
        inicio: new Date (this.formModal.value.inicio),
        fin: new Date(this.formModal.value.fin),
        descripcion:this.formModal.value.descripcion,
        color: colorEvento,
        creado_en:new Date(),
        actualizado_en:new Date(),
      }

      if(this.editado) {
        this.calendarioService.updateEvento(nuevoEvento.id!, nuevoEvento).subscribe(()=>{
          this.loadEventos()
          this.modalService.dismissAll()
          this.toastr.info('El evento fué actualizado con exito', 'Evento actualizado')
        })
      }else{
        this.calendarioService.guardarEvento(nuevoEvento).subscribe(()=>{
        this.loadEventos()
        this.modalService.dismissAll()
        this.toastr.success('El evento fué creado con exito', 'Evento creado')
      })
    }

      
  }
}
// headel para borrar


abrirconfirmacion(){
  const modalDelete = this.modalService.open(this.confirmacionModal,{ariaLabelledBy: 'confirmacionModalLabel'})

  modalDelete.result.finally(()=>{
      this.borrarEvento()
  })
}
  borrarEvento() {
    if (this.selectedEventId) {
        this.calendarioService.deleteEvento(this.selectedEventId).subscribe(() => {
          this.eventoSeleccionado?.event.remove()
          this.loadEventos()
          this.modalService.dismissAll();
          this.toastr.warning('El evento fué eliminado con exito', 'Evento eliminado')
      })
    }
  }
}

