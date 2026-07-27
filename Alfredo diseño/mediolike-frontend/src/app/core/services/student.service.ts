import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/courses';

  enrollCourse(courseId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/enroll`, {});
  }

  updateProgress(courseId: number, progress: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}/progress`, { progress });
  }

  getEnrolledCourses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users/me/enrollments');
  }
}
