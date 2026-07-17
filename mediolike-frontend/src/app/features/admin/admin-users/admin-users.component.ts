import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent {
  
  users = [
    { id: 1, name: 'Juan Pérez', email: 'juan@estudiante.com', role: 'Participant', status: 'Activo', lastLogin: '2024-05-12' },
    { id: 2, name: 'María Gómez', email: 'maria@instructor.com', role: 'Instructor', status: 'Activo', lastLogin: '2024-05-11' },
    { id: 3, name: 'Carlos Admin', email: 'carlos@admin.com', role: 'Admin', status: 'Activo', lastLogin: '2024-05-12' },
    { id: 4, name: 'Luis Suspendido', email: 'luis@baneado.com', role: 'Participant', status: 'Inactivo', lastLogin: '2024-01-10' }
  ];

  searchTerm = '';

  get filteredUsers() {
    return this.users.filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  changeRole(user: any, newRole: string) {
    user.role = newRole;
    alert(`Rol de ${user.name} cambiado a ${newRole}.`);
  }

  toggleStatus(user: any) {
    user.status = user.status === 'Activo' ? 'Inactivo' : 'Activo';
  }

  inviteUser() {
    const email = prompt('Ingresa el correo electrónico del usuario a invitar:');
    if (email) {
      alert(`Invitación enviada a ${email} correctamente.`);
    }
  }

}
