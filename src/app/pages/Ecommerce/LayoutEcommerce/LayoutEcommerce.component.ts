import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EcommerceHeaderComponent } from '../ecommerceHeader/ecommerceHeader.component';
import { EcommerceSidebarComponent } from '../ecommerceSidebar/ecommerceSidebar.component';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-layout-ecommerce',
  standalone: true,
  imports: [EcommerceHeaderComponent, EcommerceSidebarComponent, RouterOutlet],
  template: `
  <div class="h-screen w-screen overflow-hidden">
    <app-ecommerce-header></app-ecommerce-header>
    <div class="flex items-start justify-start w-full h-screen overflow-hidden">
      @if (router.url !== '/comercio/carrito') {
        <app-ecommerce-sidebar></app-ecommerce-sidebar>
      }
      <div class="pl-14 h-full w-full overflow-y-auto overflow-x-hidden">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
  styleUrl: './LayoutEcommerce.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutEcommerceComponent extends BaseComponent { }
