import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService, Role } from '../../../core/services/role.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-roles',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, DialogModule, InputTextModule, ReactiveFormsModule],
    templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
    roles: Role[] = [];
    displayDialog: boolean = false;
    roleForm: FormGroup;

    constructor(private roleService: RoleService, private fb: FormBuilder) {
        this.roleForm = this.fb.group({
            name: ['', Validators.required],
            description: ['']
        });
    }

    ngOnInit(): void {
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles().subscribe({
            next: (data: any) => this.roles = data,
            error: (err: any) => console.error('Error loading roles', err)
        });
    }

    deleteRole(id: string): void {
        if (confirm('¿Seguro de eliminar este Rol?')) {
            this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
        }
    }

    showDialog(): void {
        this.displayDialog = true;
        this.roleForm.reset();
    }

    hideDialog(): void {
        this.displayDialog = false;
    }

    saveRole(): void {
        if (this.roleForm.valid) {
            this.roleService.createRole(this.roleForm.value).subscribe({
                next: () => {
                    this.hideDialog();
                    this.loadRoles();
                },
                error: (err: any) => console.error('Error saving role', err)
            });
        }
    }
}
