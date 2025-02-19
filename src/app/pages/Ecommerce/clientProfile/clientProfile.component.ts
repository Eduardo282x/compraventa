import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ICliente } from '../../../interfaces/cliente.interface';
import { IResponseLogin } from '../../../interfaces/users.interface';
import { ClienteService } from '../../../services/clients.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [MatListModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './clientProfile.component.html',
  styleUrl: './clientProfile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientProfileComponent implements OnInit {
  clientService = inject(ClienteService);

  clientRegisterForm = new FormGroup({
    clientName: new FormControl('', [Validators.required]),
    clientLastName: new FormControl('', [Validators.required]),
    clientRif: new FormControl('', [Validators.required]),
    clientPhone: new FormControl('', [Validators.required]),
    clientAddress: new FormControl('', [Validators.required]),
    clientEmail: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      const findClient = this.clientService.getClienteById();

      if (findClient) {
        const parseClient = {
          clientName: findClient.clientName,
          clientLastName: findClient.clientLastName,
          clientRif: findClient.clientRif,
          clientPhone: findClient.clientPhone,
          clientAddress: findClient.clientAddress,
          clientEmail: findClient.clientEmail,
        }
        this.clientRegisterForm.setValue(parseClient);
      }
    })
  }
  ngOnInit(): void {
    const client: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);
    if (client) {
      this.clientService.getClienteByIdAPI(client.id)
    }
  }

  onSubmit() {
    const client: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);

    const parseClientBody = {
      ...this.clientRegisterForm.value,
      id: client.id,
      clientPassword: client.clientPassword
    }
    this.clientService.putClienteAPI(parseClientBody)
  }


}
