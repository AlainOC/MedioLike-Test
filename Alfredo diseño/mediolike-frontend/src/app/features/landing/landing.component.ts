import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChildren('reveal') revealElements!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Interseccion para animar los elementos al hacer scroll hacia abajo y hacia arriba
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });

    this.revealElements.forEach(el => observer.observe(el.nativeElement));
  }
}
