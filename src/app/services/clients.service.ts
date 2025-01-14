import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService{

  private setCliente = signal<any[]>([]);
  public getCliente = computed<any[]>(() => this.setCliente());

  getClienteAPI(): void {
    this.httpClient.get<any[]>(`${this.base_api_url}/clientes`).subscribe((response: any[]) => {
      this.setCliente.set(response);
    })
  }

  postClienteAPI(cliente: any): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/clientes`, cliente).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getClienteAPI();
    })
  }

  putClienteAPI(cliente: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/clientes`, cliente).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getClienteAPI();
    })
  }

  deleteClienteAPI(clienteId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/clientes/${clienteId}`).subscribe((response: BaseResponse) => {
      this.getClienteAPI();
    })
  }
}
