import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core/index.js';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/daygrid';
import listPlugin from "@fullcalendar/list"



@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, RouterOutlet],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
})
export class CalendarioComponent implements OnInit {
  title: string = 'Calendario de eventos';

  events: EventInput[] = [
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

  constructor(private changeDetector: ChangeDetectorRef){}

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
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect();

    if(title){
      calendarApi.addEvent({
      id:String(Date.now()),
      title,
      start:selectInfo.startStr,
      end:selectInfo.endStr,
      allDay: selectInfo.allDay
    });
  }
}

handleEventClick(clickInfo: EventClickArg) {
  if(confirm(`¿Seguro quiere eliminar el evento ${clickInfo.event.title}`)){
    clickInfo.event.remove()
  }

}

handleEvents(){

}

  ngOnInit(): void {

  }

 

}
