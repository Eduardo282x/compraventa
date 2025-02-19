import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { ICliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService{

  private setCliente = signal<ICliente[]>([]);
  public getCliente = computed<ICliente[]>(() => this.setCliente());

  private setClienteById = signal<ICliente | null>(null);
  public getClienteById = computed<ICliente | null>(() => this.setClienteById());

  getClienteByIdAPI(id: number): void {
    this.httpClient.get<ICliente>(`${this.base_api_url}/clientes/${id}`).subscribe((response: ICliente) => {
      this.setClienteById.set(response);
    })
  }

  getClienteAPI(): void {
    this.httpClient.get<ICliente[]>(`${this.base_api_url}/clientes`).subscribe((response: ICliente[]) => {
      this.setCliente.set(response);
    })
  }

  postClienteAPI(cliente: any): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/clientes`, cliente).subscribe((response: BaseResponse) => {
      this.getClienteAPI();
    })
  }

  putClienteAPI(cliente: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/clientes`, cliente).subscribe((response: BaseResponse) => {
      this.getClienteAPI();
    window.location.reload();

    })
  }

  deleteClienteAPI(clienteId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/clientes/${clienteId}`).subscribe((response: BaseResponse) => {
      this.getClienteAPI();
    })
  }
}
