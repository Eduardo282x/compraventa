import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { IMethodPayment, IPayments } from '../interfaces/pagos.interface';
import { IPedidos } from '../interfaces/pedidos.interface';

@Injectable({
    providedIn: 'root'
})
export class PedidosService extends BaseService {

    private setPedidos = signal<IPedidos[]>([]);
    public getPedidos = computed<IPedidos[]>(() => this.setPedidos());

    getPedidosAPI(): void {
        this.httpClient.get<IPedidos[]>(`${this.base_api_url}/pedidos`).subscribe((response: IPedidos[]) => {
            this.setPedidos.set(response);
        })
    }

    getPedidosByClientAPI(clientId: number): void {
        this.httpClient.get<IPedidos[]>(`${this.base_api_url}/pedidos/${clientId}`).subscribe((response: IPedidos[]) => {
            this.setPedidos.set(response);
        })
    }

    postPedidosAPI(pedidos: any): void {
        this.httpClient.post<BaseResponse>(`${this.base_api_url}/pedidos`, pedidos).subscribe((response: BaseResponse) => {
            this.getPedidosAPI();
        })
    }

    putPedidosAPI(pedidos: any): void {
        this.httpClient.put<BaseResponse>(`${this.base_api_url}/pedidos`, pedidos).subscribe((response: BaseResponse) => {
            this.getPedidosAPI();
        })
    }

}
