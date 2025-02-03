import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EcommerceHeaderComponent } from '../ecommerceHeader/ecommerceHeader.component';
import { EcommerceSidebarComponent } from '../ecommerceSidebar/ecommerceSidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-ecommerce',
  standalone: true,
  imports: [EcommerceHeaderComponent, EcommerceSidebarComponent, RouterOutlet],
  template: `
  <div class="h-screen w-screen overflow-hidden">
  <app-ecommerce-header></app-ecommerce-header>
    <div class="flex items-start justify-start w-full h-screen overflow-hidden">
    <app-ecommerce-sidebar></app-ecommerce-sidebar>
      <div class="pl-14 h-full overflow-y-auto overflow-x-hidden">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styleUrl: './LayoutEcommerce.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutEcommerceComponent { }
