import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService extends BaseService{

  private setSucursales = signal<any[]>([]);
  public getSucursales = computed<any[]>(() => this.setSucursales());

  getSucursalesAPI(): void {
    this.httpClient.get<any[]>(`${this.base_api_url}/sucursal`).subscribe((response: any[]) => {
      this.setSucursales.set(response);
    })
  }

  postSucursalesAPI(Sucursales: any): void {
    Sucursales.SucursalesRoleId = Number(Sucursales.SucursalesRoleId);
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/sucursal`, Sucursales).subscribe((response: BaseResponse) => {
      this.getSucursalesAPI();
    })
  }

  putSucursalesAPI(Sucursales: any): void {
    Sucursales.SucursalesRoleId = Number(Sucursales.SucursalesRoleId);
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/sucursal`, Sucursales).subscribe((response: BaseResponse) => {
      this.getSucursalesAPI();
    })
  }

  deleteSucursalesAPI(sucursalId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/sucursal/${sucursalId}`).subscribe((response: BaseResponse) => {
      this.getSucursalesAPI();
    })
  }
}
