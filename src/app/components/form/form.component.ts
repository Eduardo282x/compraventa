import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { IFormulario } from '../../interfaces/form.interface';
import { BaseComponent } from '../../pages/base/base.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent extends BaseComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: IFormulario,
  ) {
    super()
  }

  globalForm = new FormGroup({});

  ngOnInit(): void {
    this.formData.dataForm.map((form) => {
      const validators = form.required ? [Validators.required] : [];
      this.globalForm.addControl(form.formControl, new FormControl(form.value, validators));
    });

    console.log(this.globalForm.value);
  }

  onSubmit(): void {
    this.dialogRef.close(this.globalForm.value)
  }
}
