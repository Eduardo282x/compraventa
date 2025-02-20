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

  generateRandomIcon(): string {
    const icons = ['local_pizza', 'fastfood', 'restaurant', 'local_cafe', 'emoji_food_beverage', 'liquor', 'icecream', 'cake', 'shopping_cart', 'storefront', 'local_mall', 'watch', 'smartphone', 'laptop_mac', 'headphones', 'sports_soccer', 'fitness_center', 'child_friendly', 'style', 'diamond',];
    return icons[Math.floor(Math.random() * icons.length)];
  }

  ngOnInit(): void {
    this.categoryService.getCategoryAPI()
  }

  navigateTo(url: string) {
    this.router.navigate([url])
  }

  logoutClient() {
    this.router.navigate(['/comercio'])
    this.authService.clientInfo.set(null);
    localStorage.removeItem('clientToken')
  }
}
