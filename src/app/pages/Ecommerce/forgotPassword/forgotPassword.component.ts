import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ICliente } from '../../../interfaces/cliente.interface';
import { IUser } from '../../../interfaces/users.interface';
import { AuthService } from '../../../services/auth.service';
import { BaseComponent } from '../../base/base.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password',
  imports: [MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './forgotPassword.component.html',
  styleUrl: './forgotPassword.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent extends BaseComponent {

  authService = inject(AuthService);
  messageError: string = '';

  backupPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    identify: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const { password, confirmPassword, email, identify } = this.backupPasswordForm.value;
    console.log(this.backupPasswordForm.value);
    
    if (password !== confirmPassword) {
      this.messageError = 'Las contraseñas no coinciden.'
    }
    if (password === '' || confirmPassword === '') {
      this.messageError = 'Los campos son requeridos.'
    }

    if (this.backupPasswordForm.valid) {
      this.messageError = ''

      const url = this.router.url === '/recuperar' ? '/auth/backup' : '/auth/cliente/backup';
      const bodyPassword = {
        email: email,
        identify: identify,
        password: password,
      }

      this.authService.putPassword(url, bodyPassword)

      if(this.router.url === '/recuperar'){
        this.router.navigate(['/login']);
      }
    }
  }

}
