import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/courses';

  private coursesSubject = new BehaviorSubject<any[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor() {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.coursesSubject.next(data);
    });
  }

  // Mantiene compatibilidad síncrona básica devolviendo el valor actual
  getCourses() {
    return this.coursesSubject.getValue();
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addCourse(courseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      ...courseData,
      image: courseData.image || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800`
    }).pipe(
      tap(() => this.loadCourses()) // Recarga los cursos al añadir
    );
  }

  updateCourse(id: number, courseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, courseData).pipe(
      tap(() => this.loadCourses())
    );
  }

  getAIRecommendations(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recommendations/ai`);
  }
}
