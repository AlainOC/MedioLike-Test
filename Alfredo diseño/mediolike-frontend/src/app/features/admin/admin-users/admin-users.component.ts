import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  
  private userService = inject(UserService);
  users: any[] = [];
  searchTerm = '';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.map(u => ({
          id: u.id,
          name: `${u.profile?.firstName || ''} ${u.profile?.lastName || ''}`.trim() || 'Usuario',
          email: u.email,
          role: u.role?.name || 'Participant',
          status: 'Activo', // Por ahora todos activos
          lastLogin: u.updatedAt
        }));
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }

  get filteredUsers() {
    return this.users.filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || u.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  changeRole(user: any, newRole: string) {
    this.userService.updateUserRole(user.id, newRole).subscribe({
      next: () => {
        user.role = newRole;
        alert(`Rol de ${user.name} cambiado a ${newRole}.`);
      },
      error: () => alert('Error al cambiar el rol')
    });
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
