import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BaseComponent } from '../../base/base.component';
import { AuthService } from '../../../services/auth.service';
import { ICliente } from '../../../interfaces/cliente.interface';
import { IUser } from '../../../interfaces/users.interface';

@Component({
  selector: 'app-password',
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordComponent extends BaseComponent {

  authService = inject(AuthService);
  messageError: string = '';

  backupPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const { password, confirmPassword } = this.backupPasswordForm.value
    if (password !== confirmPassword) {
      this.messageError = 'Las contraseñas no coinciden.'
    }
    if (password === '' || confirmPassword === '') {
      this.messageError = 'Los campos son requeridos.'
    }

    if (password === confirmPassword) {
      const getUserInfo: IUser = JSON.parse(localStorage.getItem('userToken') as string);
      const client: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

      const url = this.router.url === '/comercio/contrasena' ? '/auth/cliente/password' : '/auth/password';
      const bodyPassword = {
        password: password,
        id: this.router.url === '/comercio/contrasena' ? client.id : getUserInfo.id
      }

      this.authService.putPassword(url, bodyPassword)
    }
  }

}
