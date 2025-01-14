import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { IBodyUser, IBodyUserEdit, IChangeStatusUser, IUser } from '../interfaces/users.interface';
import { BaseResponse } from '../interfaces/base.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService{

  private setUsers = signal<IUser[]>([]);
  public getUsers = computed<IUser[]>(() => this.setUsers());

  private setRoles = signal<any[]>([]);
  public getRoles = computed<any[]>(() => this.setRoles());

  public getUserLocal(): IUser | null {
    return JSON.parse(localStorage.getItem('userToken') as string);
  }

  getUsersAPI(): void {
    this.httpClient.get<IUser[]>(`${this.base_api_url}/usuarios`).subscribe((response: IUser[]) => {
      this.setUsers.set(response);
    })

  }
  getRolesAPI(): void {
    this.httpClient.get<any[]>(`${this.base_api_url}/usuarios/roles`).subscribe((response: any[]) => {
      this.setRoles.set(response);
    })
  }

  postUsersAPI(users: IBodyUser): void {
    users.usersRoleId = Number(users.usersRoleId);
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/usuarios`, users).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getUsersAPI();
    })
  }
  updateUsersStatusAPI(users: IChangeStatusUser): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/usuarios/status`, users).subscribe((response: BaseResponse) => {
      // console.log(response);
      this.getUsersAPI();
    })
  }
  putUsersAPI(users: IBodyUserEdit): void {
    users.usersRoleId = Number(users.usersRoleId);
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
