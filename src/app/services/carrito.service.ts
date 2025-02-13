import { computed, Injectable, signal } from '@angular/core';
import { ICarrito } from '../pages/Ecommerce/card/card.component';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { ICarritoAPI } from '../interfaces/carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService extends BaseService {

  public setCarrito = signal<ICarrito[]>([]);
  public getCarrito = computed<ICarrito[]>(() => this.setCarrito());

  private setCarritoApi = signal<ICarritoAPI[]>([]);
  public getCarritoApi = computed<ICarritoAPI[]>(() => this.setCarritoApi());

  getCarritoAPI(cliId: string) {
    this.httpClient.get<ICarritoAPI[]>(`${this.base_api_url}/carrito/${cliId}`).subscribe((response: ICarritoAPI[]) => {
      this.setCarritoApi.set(response);
    })
  }

  postCarritosAPI(carrito: any, cliId: string): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/carrito`, carrito).subscribe((response: BaseResponse) => {
      this.getCarritoAPI(cliId);
    })
  }

  putCarritosAPI(carrito: any, cliId: string): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/carrito`, carrito).subscribe((response: BaseResponse) => {
      this.getCarritoAPI(cliId);
    })
  }

  deleteCarritosAPI(carritoId: number, cliId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/carrito/${carritoId}`).subscribe((response: BaseResponse) => {
      this.getCarritoAPI(cliId);
    })
  }


}
