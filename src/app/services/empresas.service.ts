import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { IEmpresas } from '../interfaces/empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends BaseService{

  private setEmpresas = signal<IEmpresas[]>([]);
  public getEmpresas = computed<IEmpresas[]>(() => this.setEmpresas());

  getEmpresasAPI(): void {
    this.httpClient.get<IEmpresas[]>(`${this.base_api_url}/empresa`).subscribe((response: IEmpresas[]) => {
      this.setEmpresas.set(response);
    })
  }

  postEmpresasAPI(empresas: any): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/empresa`, empresas).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }

  putEmpresasAPI(empresas: any): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/empresa`, empresas).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }

  deleteEmpresasAPI(empresasId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/empresa/${empresasId}`).subscribe((response: BaseResponse) => {
      this.getEmpresasAPI();
    })
  }
}
