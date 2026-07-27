import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/course.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss'
})
export class CertificateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private courseService = inject(CourseService);

  studentName = '';
  courseTitle = 'Curso de Prueba';
  instructorName = 'Instructor';
  issueDate = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  isGenerating = false;
  certificateUrl = '';

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.studentName = `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim() || 'Estudiante';
    }

    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.certificateUrl = window.location.origin + '/certificate/' + courseId;
      this.courseService.getCourseById(Number(courseId)).subscribe(course => {
        if (course) {
          this.courseTitle = course.title;
          if (course.instructor?.profile) {
            this.instructorName = `${course.instructor.profile.firstName} ${course.instructor.profile.lastName}`.trim();
          } else if (course.instructor?.email) {
            this.instructorName = course.instructor.email;
          }
        }
      });
    }
  }

  async printCertificate() {
    const element = document.getElementById('certificate');
    if (!element) return;

    this.isGenerating = true;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Mejor resolución
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificado_${this.courseTitle.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('Error al generar PDF', err);
    } finally {
      this.isGenerating = false;
    }
  }
}
