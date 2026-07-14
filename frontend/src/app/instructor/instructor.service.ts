import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from './instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  // Inyección de dependencias moderna usando la función inject()
  private http = inject(HttpClient);
  
  // URL solicitada (Nota: si usas el backend anterior, añade '/api' antes de '/instructors')
  private apiUrl = 'http://localhost:3000/instructors';

  getAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getById(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  create(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor);
  }

  update(id: string, instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, instructor);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
