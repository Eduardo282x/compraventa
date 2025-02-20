import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { ICliente } from '../interfaces/cliente.interface';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public clientInfo = signal<ICliente | null>(null);
  public setClientInfo = computed<ICliente | null>(() => this.clientInfo());

  putPassword(url: string, password: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}${url}`, password).subscribe((response: BaseResponse) => {
    })
  }

}
