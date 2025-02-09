import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { ICliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public clientInfo = signal<ICliente>({} as ICliente);
  public setClientInfo = computed(() => this.clientInfo()); 

}
