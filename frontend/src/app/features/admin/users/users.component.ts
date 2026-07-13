import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../../../core/services/user.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, DialogModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    displayDialog: boolean = false;
    userForm: FormGroup;

    constructor(private userService: UserService, private fb: FormBuilder) {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            passwordHash: ['', Validators.required],
            status: ['ACTIVE', Validators.required],
            roleId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (data: any) => this.users = data,
            error: (err) => console.error('Error loading users', err)
        });
    }

    deleteUser(id: string): void {
        if (confirm('¿Seguro de eliminar el usuario?')) {
            this.userService.deleteUser(id).subscribe(() => this.loadUsers());
        }
    }

    showDialog(): void {
        this.displayDialog = true;
        this.userForm.reset({ status: 'ACTIVE' });
    }

    hideDialog(): void {
        this.displayDialog = false;
    }

    saveUser(): void {
        if (this.userForm.valid) {
            this.userService.createUser(this.userForm.value).subscribe({
                next: () => {
                    this.hideDialog();
                    this.loadUsers();
                },
                error: (err: any) => console.error('Error saving user', err)
            });
        }
    }
}
