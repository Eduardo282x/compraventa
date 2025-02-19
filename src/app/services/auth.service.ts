import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { ICliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public clientInfo = signal<ICliente | null>(null);
  public setClientInfo = computed<ICliente | null>(() => this.clientInfo()); 
}
