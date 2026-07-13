import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Setting {
    id: string;
    key: string;
    value: string;
    valueType: 'string' | 'json' | 'boolean' | 'number';
    description: string;
    isPublic: boolean;
    updatedAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class SettingService {
    private apiUrl = 'http://localhost:3000/api/settings';

    constructor(private http: HttpClient) { }

    getSettings(): Observable<Setting[]> {
        return this.http.get<Setting[]>(this.apiUrl);
    }

    createSetting(setting: any): Observable<Setting> {
        return this.http.post<Setting>(this.apiUrl, setting);
    }

    updateSetting(id: string, setting: any): Observable<Setting> {
        return this.http.put<Setting>(`${this.apiUrl}/${id}`, setting);
    }

    deleteSetting(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
