import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../interfaces/category.interface';
import { BaseComponent } from '../../base/base.component';
import { RouterLink } from '@angular/router';
import { ICliente } from '../../../interfaces/cliente.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ecommerce-sidebar',
  imports: [RouterLink],
  templateUrl: './ecommerceSidebar.component.html',
  styleUrl: './ecommerceSidebar.component.css',
})
export class EcommerceSidebarComponent extends BaseComponent implements OnInit {
  clientInfo: ICliente | null = null;

  authService = inject(AuthService);
  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef)

  categoriesMenu: ICategory[] = [];

  constructor() {
    super()
    effect(() => {
      this.categoriesMenu = this.categoryService.getCategory();
      this.clientInfo = this.authService.setClientInfo();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategoryAPI()
  }

  logoutClient() {
    this.authService.clientInfo.set(null);
    localStorage.removeItem('clientToken')
  }
}
