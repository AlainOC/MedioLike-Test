import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private apiUrl = 'http://localhost:3000/api/roles';

    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl);
    }

    createRole(role: any): Observable<Role> {
        return this.http.post<Role>(this.apiUrl, role);
    }

    deleteRole(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
