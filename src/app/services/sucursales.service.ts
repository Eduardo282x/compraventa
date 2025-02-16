import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { ISucursales } from '../interfaces/sucursales.interface';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService extends BaseService {

  private setSucursales = signal<ISucursales[]>([]);
  public getSucursales = computed<ISucursales[]>(() => this.setSucursales());
  
  getSucursalesAPI(): void {
    this.httpClient.get<ISucursales[]>(`${this.base_api_url}/sucursal`).subscribe((response: ISucursales[]) => {
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
