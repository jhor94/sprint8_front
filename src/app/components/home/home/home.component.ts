import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
declare let bootstrap:any


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements AfterViewInit{

  carousel: any;
  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('carouselExampleControls');
    if (carouselElement) {
      this.carousel = new bootstrap.Carousel(carouselElement);
    }
  }

  goToPrev(): void {
    this.carousel.prev();
  }

  goToNext(): void {
    this.carousel.next();
  }

}
