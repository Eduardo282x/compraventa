import { Component } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';
import { BaseComponent } from '../../pages/base/base.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent extends BaseComponent {
  menu: IMenu[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      redirectTo: '/home'
    },
    {
      label: 'Inventario',
      icon: 'inventory',
      redirectTo: '/inventario'
    },
    {
      label: 'Categorias',
      icon: 'category',
      redirectTo: '/categorias'
    },
    {
      label: 'Pedidos',
      icon: 'shopping_cart',
      redirectTo: '/pedidos'
    },
    {
      label: 'Clientes',
      icon: 'people',
      redirectTo: '/clientes'
    },
    {
      label: 'Proveedores',
      icon: 'manage_accounts',
      redirectTo: '/proveedores'
    },
    {
      label: 'Reportes',
      icon: 'assessment',
      redirectTo: '/reportes'
    },
    {
      label: 'Empresas',
      icon: 'apartment',
      redirectTo: '/empresas'
    },
    {
      label: 'Sucursales',
      icon: 'store',
      redirectTo: '/sucursales'
    },
    {
      label: 'Usuarios',
      icon: 'group',
      redirectTo: '/usuarios'
    },
  ]

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
