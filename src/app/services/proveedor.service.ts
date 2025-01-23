import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { IProveedor } from '../interfaces/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends BaseService{

  private setProveedor = signal<IProveedor[]>([]);
  public getProveedor = computed<IProveedor[]>(() => this.setProveedor());

  getProveedorAPI(): void {
    this.httpClient.get<IProveedor[]>(`${this.base_api_url}/proveedores`).subscribe((response: IProveedor[]) => {
      this.setProveedor.set(response);
    })
  }

  postProveedorAPI(Proveedor: any): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/proveedores`, Proveedor).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getProveedorAPI();
    })
  }

  putProveedorAPI(Proveedor: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/proveedores`, Proveedor).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getProveedorAPI();
    })
  }

  deleteProveedorAPI(ProveedorId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/proveedores/${ProveedorId}`).subscribe((response: BaseResponse) => {
      this.getProveedorAPI();
    })
  }
}
