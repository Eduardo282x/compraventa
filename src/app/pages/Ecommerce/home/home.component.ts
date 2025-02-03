import { Component } from '@angular/core';
import { EcommerceHeaderComponent } from "../ecommerceHeader/ecommerceHeader.component";
import { CardComponent } from "../card/card.component";
import { EcommerceSidebarComponent } from "../ecommerceSidebar/ecommerceSidebar.component";

@Component({
  selector: 'app-home',
  imports: [EcommerceHeaderComponent, CardComponent, EcommerceSidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponentV2 {

  categories: string[] =[
    'Productos Más Vendidos',
    'Bebidas',
    'Comestibles',
    'Medicinas'
  ]
}
