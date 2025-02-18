import { computed, inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { BodyInventario, BodyUpdateInventory, IInventario, Moneda, Unidad, IAlmacen, BodyIncreaseInventory, BodySaveInventoryInSucursal } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService extends BaseService{

  private setAlmacen = signal<IAlmacen[]>([]);
  public getAlmacen = computed<IAlmacen[]>(() => this.setAlmacen());

  private setInventario = signal<IInventario[]>([]);
  public getInventario = computed<IInventario[]>(() => this.setInventario());

  private setMoneda = signal<Moneda[]>([]);
  public getMoneda = computed<Moneda[]>(() => this.setMoneda());

  public setCurrency = signal<number>(1);
  public getCurrency = computed<number>(() => this.setCurrency());

  private setUnidad = signal<Unidad[]>([]);
  public getUnidad = computed<Unidad[]>(() => this.setUnidad());

  getAlmacenAPI(): void {
    this.httpClient.get<IAlmacen[]>(`${this.base_api_url}/producto/almacen`).subscribe((response: IAlmacen[]) => {
      this.setAlmacen.set(response);
    })
  }

  getInventarioAPI(sucursalId: number): void {
    this.httpClient.get<IInventario[]>(`${this.base_api_url}/producto?sucursalId=${sucursalId}`).subscribe((response: IInventario[]) => {
      this.setInventario.set(response);
    })
  }

  getInventarioFiltradoAPI(category: string, product: string, sucursalId: string): void {
    const url = `${this.base_api_url}/producto/filter?categoria=${category}&producto=${product}&sucursalId=${sucursalId}`
    this.httpClient.get<IInventario[]>(url).subscribe((response: IInventario[]) => {
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
      this.getAlmacenAPI();
    })
  }
  putInventarioAPI(Inventario: BodyUpdateInventory): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/producto`, Inventario).subscribe((response: BaseResponse) => {
      this.getAlmacenAPI();
    })
  }
  putInventarioSaveAPI(Inventario: BodySaveInventoryInSucursal): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/producto/guardar`, Inventario).subscribe((response: BaseResponse) => {
      this.getInventarioAPI(1);
    })
  }
  putInventarioIncreaseAPI(Inventario: BodyIncreaseInventory): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/producto/aumentar`, Inventario).subscribe((response: BaseResponse) => {
      this.getAlmacenAPI();
    })
  }
  deleteInventarioAPI(catId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/producto/${catId}`).subscribe((response: BaseResponse) => {
      this.getAlmacenAPI();
    })
  }
}
