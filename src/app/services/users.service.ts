import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BodyUpdateUsuario, BodyUsuario, IUser, Rol } from '../interfaces/users.interface';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService{

  private setUsers = signal<IUser[]>([]);
  public getUsers = computed<IUser[]>(() => this.setUsers());

  private setRoles = signal<Rol[]>([]);
  public getRoles = computed<Rol[]>(() => this.setRoles());

  public getUserLocal(): IUser | null {
    return JSON.parse(localStorage.getItem('userToken') as string);
  }

  getUsersAPI(): void {
    this.httpClient.get<IUser[]>(`${this.base_api_url}/usuarios`).subscribe((response: IUser[]) => {
      this.setUsers.set(response);
    })

  }
  getRolesAPI(): void {
    this.httpClient.get<Rol[]>(`${this.base_api_url}/usuarios/roles`).subscribe((response: Rol[]) => {
      this.setRoles.set(response);
    })
  }

  postUsersAPI(users: BodyUsuario): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/usuarios`, users).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getUsersAPI();
    })
  }
  putUsersAPI(users: BodyUpdateUsuario): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/usuarios`, users).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getUsersAPI();
    })
  }
  deleteUsersAPI(userId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/usuarios/${userId}`).subscribe((response: BaseResponse) => {
      this.getUsersAPI();
    })
  }
}
