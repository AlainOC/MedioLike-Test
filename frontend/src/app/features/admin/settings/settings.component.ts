import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService, Setting } from '../../../core/services/setting.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, DialogModule, InputTextModule, CheckboxModule, ReactiveFormsModule],
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    settings: Setting[] = [];
    displayDialog: boolean = false;
    settingForm: FormGroup;
    isEditMode: boolean = false;
    currentSettingId: string | null = null;

    constructor(private settingService: SettingService, private fb: FormBuilder) {
        this.settingForm = this.fb.group({
            key: ['', Validators.required],
            value: ['', Validators.required],
            valueType: ['string', Validators.required],
            description: [''],
            isPublic: [false]
        });
    }

    ngOnInit(): void {
        this.loadSettings();
    }

    loadSettings(): void {
        this.settingService.getSettings().subscribe({
            next: (data: any) => this.settings = data,
            error: (err: any) => console.error('Error loading settings', err)
        });
    }

    deleteSetting(id: string): void {
        if (confirm('¿Seguro de eliminar esta configuración?')) {
            this.settingService.deleteSetting(id).subscribe(() => this.loadSettings());
        }
    }

    showDialog(setting?: Setting): void {
        this.displayDialog = true;
        if (setting) {
            this.isEditMode = true;
            this.currentSettingId = setting.id;
            this.settingForm.patchValue(setting);
        } else {
            this.isEditMode = false;
            this.currentSettingId = null;
            this.settingForm.reset({ valueType: 'string', isPublic: false });
        }
    }

    hideDialog(): void {
        this.displayDialog = false;
    }

    saveSetting(): void {
        if (this.settingForm.valid) {
            const apiCall = this.isEditMode && this.currentSettingId
                ? this.settingService.updateSetting(this.currentSettingId, this.settingForm.value)
                : this.settingService.createSetting(this.settingForm.value);

            apiCall.subscribe({
                next: () => {
                    this.hideDialog();
                    this.loadSettings();
                },
                error: (err: any) => console.error('Error saving setting', err)
            });
        }
    }
}
