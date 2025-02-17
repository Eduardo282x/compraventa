import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { IMethodPayment, IPayments } from '../interfaces/pagos.interface';

@Injectable({
    providedIn: 'root'
})
export class PedidosService extends BaseService {

    private setPedidos = signal<any[]>([]);
    public getPedidos = computed<any[]>(() => this.setPedidos());

    getPedidosAPI(): void {
        this.httpClient.get<any[]>(`${this.base_api_url}/pedidos`).subscribe((response: any[]) => {
            this.setPedidos.set(response);
        })
    }

    postPedidosAPI(pedidos: any): void {
        this.httpClient.post<BaseResponse>(`${this.base_api_url}/pedidos`, pedidos).subscribe((response: BaseResponse) => {
            this.getPedidosAPI();
        })
    }

    putPedidosAPI(pedidos: any[]): void {
        this.httpClient.put<BaseResponse>(`${this.base_api_url}/pedidos`, pedidos).subscribe((response: BaseResponse) => {
            this.getPedidosAPI();
        })
    }

}
