import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { BodyInventario, BodyUpdateInventory, IInventario, Moneda, Unidad } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService extends BaseService{

  private setInventario = signal<IInventario[]>([]);
  public getInventario = computed<IInventario[]>(() => this.setInventario());

  private setMoneda = signal<Moneda[]>([]);
  public getMoneda = computed<Moneda[]>(() => this.setMoneda());

  private setUnidad = signal<Unidad[]>([]);
  public getUnidad = computed<Unidad[]>(() => this.setUnidad());

  getInventarioAPI(): void {
    this.httpClient.get<IInventario[]>(`${this.base_api_url}/producto`).subscribe((response: IInventario[]) => {
      this.setInventario.set(response);
    })
  }
  getMonedaAPI(): void {
    this.httpClient.get<Moneda[]>(`${this.base_api_url}/producto/moneda`).subscribe((response: Moneda[]) => {
      this.setMoneda.set(response);
    })
  }
  getUnidadAPI(): void {
    this.httpClient.get<Unidad[]>(`${this.base_api_url}/producto/unidades`).subscribe((response: Unidad[]) => {
      this.setUnidad.set(response);
    })
  }

  postInventarioAPI(Inventario: BodyInventario): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/producto`, Inventario).subscribe((response: BaseResponse) => {
      this.getInventarioAPI();
    })
  }
  putInventarioAPI(Inventario: BodyUpdateInventory): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/producto`, Inventario).subscribe((response: BaseResponse) => {
      this.getInventarioAPI();
    })
  }
  deleteInventarioAPI(catId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/producto/${catId}`).subscribe((response: BaseResponse) => {
      this.getInventarioAPI();
    })
  }
}
