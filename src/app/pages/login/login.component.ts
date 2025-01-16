import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../base/base.component';
import { AuthService } from '../../services/auth.service';
import { ILogin, IResponseLogin } from '../../interfaces/users.interface';
import { IOptions } from '../../interfaces/form.interface';
import { EmpresasService } from '../../services/empresas.service';
import { SucursalesService } from '../../services/sucursales.service';
import { IEmpresas } from '../../interfaces/empresa.interface';
import { ISucursales } from '../../interfaces/sucursales.interface';

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
export class LoginComponent extends BaseComponent implements OnInit {

  loginForm = new FormGroup({
    empresa: new FormControl('', [Validators.required]),
    sucursal: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  enterprises: IEmpresas[] = [];
  sucursales: ISucursales[] = []

  showPassword: boolean = false;
  authService = inject(AuthService);
  empresaService = inject(EmpresasService);
  sucursalService = inject(SucursalesService);

  constructor(private _snackBar: MatSnackBar) {
    super()
    effect(() => {
      this.enterprises = this.empresaService.getEmpresas();
      this.sucursales = this.sucursalService.getSucursales();
    })
  }

  ngOnInit(): void {
    this.empresaService.getEmpresasAPI();
    this.sucursalService.getSucursalesAPI();
  }

  onSubmitLogin(): void {
    console.log(this.loginForm.value);
    this.router.navigate(['/home']);
  }

  show(): void {
    this.showPassword = !this.showPassword;
  }
}
