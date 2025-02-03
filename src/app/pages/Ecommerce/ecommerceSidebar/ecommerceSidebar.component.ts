import { Component } from '@angular/core';

@Component({
  selector: 'app-ecommerce-sidebar',
  imports: [],
  templateUrl: './ecommerceSidebar.component.html',
  styleUrl: './ecommerceSidebar.component.css',
})
export class EcommerceSidebarComponent {

  categoriesMenu = [
    {
      label: 'Menu de Categoria',
      icon: 'menu'
    },
    {
      label: 'Productos Más Vendidos',
      icon: 'trending_up'
    },
    {
      label: 'Bebidas',
      icon: 'local_bar'
    },
    {
      label: 'Comestibles',
      icon: 'storefront'
    },
    {
      label: 'Medicinas',
      icon: 'medical_services'
    },
  ]
}
