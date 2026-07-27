import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/quizzes`;

  getQuizByLesson(lessonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${lessonId}`);
  }

  submitQuiz(quizId: number, answers: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${quizId}/submit`, { answers });
  }
}
