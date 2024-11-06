import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';




@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [FullCalendarModule, CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarioComponent implements OnInit {
  title: string = 'Calendario de eventos';

  events: EventInput[] = [
    { title: 'Evento del trabajo', date: '2024-11-10' },
    { title: 'Evento del ocio', date: '2024-11-12' }
  ]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends:false,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locale: esLocale,
    editable:false,
    dateClick: (arg) => this.handleDateClick(arg),
    events: this.events
  }

  eventTitle: string = '';
  eventDate: string = '';
  eventDescription: string = '';


  ngOnInit(): void {

  }

  handleDateClick(arg: any) {
    this.eventDate = arg.dateStr
  }

  eventClick() {

  }
}
