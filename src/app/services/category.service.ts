import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { BaseResponse } from '../interfaces/base.interface';
import { BodyCategory, BodyUpdateCategories, ICategory } from '../interfaces/category.interface';
import { IUser } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService{

  private setCategory = signal<ICategory[]>([]);
  public getCategory = computed<ICategory[]>(() => this.setCategory());

  getCategoryAPI(): void {
    this.httpClient.get<ICategory[]>(`${this.base_api_url}/category`).subscribe((response: ICategory[]) => {
      this.setCategory.set(response);
    })
  }

  postCategoryAPI(category: BodyCategory): void {
    this.httpClient.post<BaseResponse>(`${this.base_api_url}/category`, category).subscribe((response: BaseResponse) => {
      this.getCategoryAPI();
    })
  }
  putCategoryAPI(category: BodyUpdateCategories): void {
    this.httpClient.put<BaseResponse>(`${this.base_api_url}/category`, category).subscribe((response: BaseResponse) => {
      this.getCategoryAPI();
    })
  }
  deleteCategoryAPI(catId: string): void {
    this.httpClient.delete<BaseResponse>(`${this.base_api_url}/category/${catId}`).subscribe((response: BaseResponse) => {
      this.getCategoryAPI();
    })
  }
}
