import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';

import { InstructorService } from './instructor.service';
import { Instructor } from './instructor.model';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    InputTextModule,
    TextareaModule
],
  providers: [MessageService], // Proveedor necesario para los Toasts
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit {
  // Inyección de dependencias (limpia y sin recargar el constructor)
  private instructorService = inject(InstructorService);
  private messageService = inject(MessageService);
  private fb = inject(FormBuilder);

  instructors: Instructor[] = [];
  instructorDialog = false;
  instructorForm!: FormGroup;
  isEditMode = false;
  submitted = false;

  ngOnInit(): void {
    this.initForm();
    this.loadInstructors();
  }

  // Inicializa el formulario reactivo
  private initForm(): void {
    this.instructorForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      specialty: ['', Validators.required],
      biography: ['', Validators.required],
      photoUrl: ['', Validators.required]
    });
  }

  loadInstructors(): void {
    this.instructorService.getAll().subscribe({
      next: (data) => this.instructors = data,
      error: () => this.showError('Error al cargar instructores')
    });
  }

  // Abre el modal para crear un nuevo registro
  openNew(): void {
    this.isEditMode = false;
    this.submitted = false;
    this.instructorForm.reset();
    this.instructorDialog = true;
  }

  // Abre el modal para editar un registro existente
  editInstructor(instructor: Instructor): void {
    this.isEditMode = true;
    this.instructorForm.patchValue(instructor);
    this.instructorDialog = true;
  }

  // Lógica principal de guardado o actualización
  saveInstructor(): void {
    this.submitted = true;

    // Detenemos si el formulario es inválido
    if (this.instructorForm.invalid) {
      return;
    }

    const instructorData = this.instructorForm.value;

    if (this.isEditMode) {
      this.instructorService.update(instructorData.id, instructorData).subscribe({
        next: () => {
          this.loadInstructors();
          this.instructorDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Instructor actualizado' });
        },
        error: () => this.showError('Error al actualizar')
      });
    } else {
      delete instructorData.id; // El ID lo generará el backend
      this.instructorService.create(instructorData).subscribe({
        next: () => {
          this.loadInstructors();
          this.instructorDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Instructor creado correctamente' });
        },
        error: () => this.showError('Error al crear')
      });
    }
  }

  // Eliminación con confirmación simple
  deleteInstructor(instructor: Instructor): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${instructor.name}?`)) {
      this.instructorService.delete(instructor.id).subscribe({
        next: () => {
          this.loadInstructors();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Instructor eliminado' });
        },
        error: () => this.showError('Error al eliminar')
      });
    }
  }

  hideDialog(): void {
    this.instructorDialog = false;
    this.submitted = false;
  }

  private showError(detail: string): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail });
  }
}
