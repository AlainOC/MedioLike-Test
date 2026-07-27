import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/comments';

  getCommentsByCourse(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`);
  }

  createComment(courseId: number, userId: number, text: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { courseId, userId, text });
  }
}
