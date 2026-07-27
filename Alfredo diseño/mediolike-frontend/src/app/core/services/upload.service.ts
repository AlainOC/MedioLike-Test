import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/upload';

  uploadFile(file: File): Observable<{ message: string; url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string; url: string; filename: string }>(this.apiUrl, formData);
  }
}
