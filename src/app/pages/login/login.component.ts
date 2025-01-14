import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '../../services/auth.service';
import { ILogin, IResponseLogin } from '../../interfaces/users.interface';
import { IOptions } from '../../interfaces/form.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends BaseComponent implements OnInit  {

  loginForm = new FormGroup({
    empresa: new FormControl('', [Validators.required]),
    sucursal: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  enterprises: IOptions[] = [
    {
      label: 'Empresa 1',
      value: 1
    },
    {
      label: 'Empresa 2',
      value: 2
    }
  ];

  sucursales: IOptions[] = [
    {
      label: 'Sucursal 1',
      value: 1
    },
    {
      label: 'Sucursal 2',
      value: 2
    }
  ]

  showPassword: boolean = false;
  authService = inject(AuthService);

  constructor(private _snackBar: MatSnackBar) {
    super()
  }

  ngOnInit(): void {

  }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    this.router.navigate(['/home']);
  }

  show(): void {
    this.showPassword = !this.showPassword;
  }
}
