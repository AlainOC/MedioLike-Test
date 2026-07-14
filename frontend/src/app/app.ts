import { Component, signal } from '@angular/core';
import { InstructorComponent } from './instructor/instructor.component';

@Component({
  selector: 'app-root',
  imports: [InstructorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mediolike-frontend');
}
