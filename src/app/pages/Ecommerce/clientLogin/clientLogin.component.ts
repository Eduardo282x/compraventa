import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { IResponseLogin } from '../../../interfaces/users.interface';
import { ICliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-client-login',
  imports: [MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './clientLogin.component.html',
  styleUrl: './clientLogin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ClientLoginComponent {

  authService = inject(AuthService);
  private _bottomSheetRef = inject<MatBottomSheetRef<ClientLoginComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  clientForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.authService.httpClient.post<IResponseLogin>(`${this.authService.base_api_url}/auth/cliente`, this.clientForm.value).subscribe((response: IResponseLogin) => {
      if(response.success == true){
        localStorage.setItem('clientToken', JSON.stringify(response.userData));
        this.authService.clientInfo.set(response.userData as ICliente);
        this._bottomSheetRef.dismiss();
      }
    });
  }

  openRegister() {
    this._bottomSheetRef.dismiss('openClientRegister');
  }
}
