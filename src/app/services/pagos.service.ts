import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { IMethodPayment, IPayments } from '../interfaces/pagos.interface';

@Injectable({
  providedIn: 'root'
})
export class PagosService extends BaseService {

  private setMetodosPagos = signal<IMethodPayment[]>([]);
  public getMetodosPagos = computed<IMethodPayment[]>(() => this.setMetodosPagos());

  private setPagos = signal<IPayments[]>([]);
  public getPagos = computed<IPayments[]>(() => this.setPagos());

  getMetodosPagosAPI(): void {
    this.httpClient.get<IMethodPayment[]>(`${this.base_api_url}/payment-method`).subscribe((response: IMethodPayment[]) => {
      this.setMetodosPagos.set(response);
    })
  }

  postMetodosPagosAPI(metodos: IMethodPayment): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/payment-method`, metodos).subscribe((response: BaseResponse) => {
      this.getMetodosPagosAPI();
    })
  }

  putMetodosPagosAPI(metodos: IMethodPayment[]): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/payment-method`, metodos).subscribe((response: BaseResponse) => {
      this.getMetodosPagosAPI();
    })
  }

  deleteMetodosPagosAPI(metodoId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/payment-method/${metodoId}`).subscribe((response: BaseResponse) => {
      this.getMetodosPagosAPI();
    })
  }

  getPaymentsAPI(): void {
    this.httpClient.get<IPayments[]>(`${this.base_api_url}/payment-method/pagos`).subscribe((response: IPayments[]) => {
      this.setPagos.set(response);
    })
  }
}
