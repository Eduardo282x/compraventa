import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ICliente } from '../../../interfaces/cliente.interface';
import { IResponseLogin } from '../../../interfaces/users.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './clientRegister.component.html',
  styleUrl: './clientRegister.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientRegisterComponent {

  authService = inject(AuthService);
  private _bottomSheetRef = inject<MatBottomSheetRef<ClientRegisterComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  clientRegisterForm = new FormGroup({
    clientName: new FormControl('', [Validators.required]),
    clientLastName: new FormControl('', [Validators.required]),
    clientRif: new FormControl('', [Validators.required]),
    clientPhone: new FormControl('', [Validators.required]),
    clientAddress: new FormControl('', [Validators.required]),
    clientEmail: new FormControl('', [Validators.required]),
    clientPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.authService.httpClient.post<IResponseLogin>(`${this.authService.base_api_url}/auth/cliente/register`, this.clientRegisterForm.value).subscribe((response: IResponseLogin) => {
      if (response.success == true) {
        localStorage.setItem('clientToken', JSON.stringify(response.userData));
        this.authService.clientInfo.set(response.userData as ICliente);
        this._bottomSheetRef.dismiss();
      }
    });
  }

}
