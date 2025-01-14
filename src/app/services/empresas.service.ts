import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends BaseService{

  private setEmpresas = signal<any[]>([]);
  public getEmpresas = computed<any[]>(() => this.setEmpresas());

  getEmpresasAPI(): void {
    this.httpClient.get<any[]>(`${this.base_api_url}/empresa`).subscribe((response: any[]) => {
      this.setEmpresas.set(response);
    })
  }

  postEmpresasAPI(empresas: any): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/empresa`, empresas).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }

  putEmpresasAPI(empresas: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/Empresa`, empresas).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }

  deleteEmpresasAPI(empresasId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/Empresa/${empresasId}`).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }
}
