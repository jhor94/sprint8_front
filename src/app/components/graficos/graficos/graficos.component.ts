import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { options } from '@fullcalendar/core/preact.js';
import { Chart, ChartType, plugins } from 'chart.js/auto';
import { VentasService } from '../../../services/ventas/ventas.service';
import { Venta } from '../../../interfaces/ventas';

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
  ventas!: Venta

  public field: 'ventas' | 'unidades_vendidas' | 'devoluciones' | 'ingresos_devoluciones' = 'ventas';

  ngAfterViewInit(): void {

  this.conexionVentas()

  }

  constructor(private cdr: ChangeDetectorRef, private ventasService: VentasService) { }

  conexionVentas(){
    this.ventasService.getVentas().subscribe((ventas) => {
      this.lineChart(ventas)
      this.barChart(ventas)
      this.cdr.detectChanges()
    })
  }

  fieldChange(newField: 'ventas' | 'unidades_vendidas' | 'devoluciones'| 'ingresos_devoluciones'){ // cambiar modalidad para hacer graficos dinamicos
    this.field = newField
    this.ngAfterViewInit()
  }

  getMonthSales(ventas: Venta[]){ // adapgtar array de meses con las ventas del back
    const salesByMonth = Array(12).fill(0)
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


    ventas.forEach(venta =>{
      const monthIndex = months.indexOf(venta.mes)
      if(monthIndex !== 1){
        salesByMonth[monthIndex] += venta[this.field]
      }
    });

    return salesByMonth // modificamos el array de meses ajuntandolo con las ventas o devoluciones

  }

 
//GRAFICO LINEAL
  lineChart(ventas:any[]) {

    if(this.chartLine){
      this.chartLine.destroy()
    }

    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: this.field,
        data: this.getMonthSales(ventas),
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
//GRAFICO DE BARRAS
  barChart(ventas: any[]) {

    if(this.chartBar){
      this.chartBar.destroy()
    }
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: this.field,
        data: this.getMonthSales(ventas),
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

