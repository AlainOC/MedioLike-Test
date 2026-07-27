import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-certificates-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './certificates-list.component.html',
  styleUrl: './certificates-list.component.scss'
})
export class CertificatesListComponent implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);

  certificates$!: Observable<any[]>;

  ngOnInit() {
    this.certificates$ = this.studentService.getEnrolledCourses().pipe(
      map(enrollments => enrollments.filter(e => e.isCompleted))
    );
  }

  viewCertificate(courseId: number) {
    this.router.navigate(['/app/certificate', courseId]);
  }
}
