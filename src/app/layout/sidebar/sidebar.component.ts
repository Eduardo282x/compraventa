import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/menu.interface';
import { BaseComponent } from '../../pages/base/base.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '../../interfaces/users.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent extends BaseComponent implements OnInit {
  menu: IMenu[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      redirectTo: '/home',
      permission: ['Administrador']
    },
    {
      label: 'Almacen',
      icon: 'factory',
      redirectTo: '/almacen',
      permission: ['Administrador']
    },
    {
      label: 'Productos',
      icon: 'inventory',
      redirectTo: '/inventario',
      permission: ['Administrador', 'Gerente']
    },
    {
      label: 'Categorías',
      icon: 'category',
      redirectTo: '/categorias',
      permission: ['Administrador', 'Gerente']
    },
    {
      label: 'Pedidos',
      icon: 'shopping_cart',
      redirectTo: '/pedidos',
      permission: ['Administrador', 'Gerente', 'Vendedor']
    },
    {
      label: 'Pagos',
      icon: 'payments',
      redirectTo: '/pagos',
      permission: ['Administrador', 'Gerente']
    },
    {
      label: 'Clientes',
      icon: 'people',
      redirectTo: '/clientes',
      permission: ['Administrador', 'Gerente']
    },
    {
      label: 'Proveedores',
      icon: 'manage_accounts',
      redirectTo: '/proveedores',
      permission: ['Administrador', 'Gerente']
    },
    {
      label: 'Métodos de pago',
      icon: 'payments',
      redirectTo: '/metodos-de-pago',
      permission: ['Administrador']
    },
    {
      label: 'Empresas',
      icon: 'apartment',
      redirectTo: '/empresas',
      permission: ['Administrador']
    },
    {
      label: 'Sucursales',
      icon: 'store',
      redirectTo: '/sucursales',
      permission: ['Administrador']
    },
    {
      label: 'Usuarios',
      icon: 'group',
      redirectTo: '/usuarios',
      permission: ['Administrador']
    },
  ];

  ngOnInit(): void {
    const getUserInfo: IUser = JSON.parse(localStorage.getItem('userToken') as string);
    if (getUserInfo) {
      this.menu = this.menu.filter(me => me.permission.includes(getUserInfo.rol.rol));
    }
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
