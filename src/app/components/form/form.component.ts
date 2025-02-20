import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
  imagePreview: string | ArrayBuffer | null = null;
  base64Image: string = '';
  fileName: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  
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
      if (form.formControl2) {
        this.globalForm.addControl(form.formControl2, new FormControl(form.value2, validators));
      }
    });
    console.log(this.globalForm.value);
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onSubmit(): void {
    if (this.fileName) {
      this.dialogRef.close({ form: { ...this.globalForm.value }, base64Image: this.base64Image, fileName: this.fileName });
    }
    else {
      this.dialogRef.close(this.globalForm.value)
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     this.handleFile(input.files[0]);
  //   }
  // }

  onFileSelected(event: any) {
    console.log(event);
    
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file)
      this.fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64Image = reader.result as string; // Guarda la imagen en Base64
      };
    }
  }

  // ✅ Verifica que el archivo sea una imagen
  private handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten imágenes.');
      return;
    }

    this.fileName = file.name;
    const reader = new FileReader();

    reader.onload = () => {
      this.base64Image = reader.result as string; // Convierte la imagen a Base64
      this.imagePreview = reader.result; // Muestra la vista previa
    };

    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }
}
