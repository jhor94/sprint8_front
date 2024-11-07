import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { options } from '@fullcalendar/core/preact.js';
import { Chart, ChartType, plugins } from 'chart.js/auto';

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})
export class GraficosComponent implements AfterViewInit {

  public chartLine!: Chart;
  public chartBar!: Chart;


  ngAfterViewInit(): void {
    this.lineChart()
    this.barChart()
    this.cdr.detectChanges()

  }

  constructor(private cdr: ChangeDetectorRef) { }
  lineChart() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40, 50],
        fill: false,
        borderColor: 'rgb(26, 99, 99)',
        tension: 0.3,

      }]
    };


    this.chartLine = new Chart("chartLine", {
      type: 'line' as ChartType,
      data,
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false // Oculta las cuadrículas en el eje X
            }
          },
          y: {
            grid: {
              display: false // Oculta las cuadrículas en el eje Y
            },
            beginAtZero: true
          }
        }
      }
    })
  }

  barChart() {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 4,
        barPercentage: 1,
        categoryPercentage: 0.7,
        tension: 0.5,
        plugins:{
          legend:{display:true}
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false // Oculta las cuadrículas en el eje X
              }
            },
            y: {
              grid: {
                display: false // Oculta las cuadrículas en el eje Y
              },
              beginAtZero: true
            }
          }
        }
      }]
    };

    this.chartBar = new Chart("chartBar", {
      type: 'bar' as ChartType,
      data
    })
  }
}

