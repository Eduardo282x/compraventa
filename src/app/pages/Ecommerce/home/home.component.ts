import { Component } from '@angular/core';
import { EcommerceHeaderComponent } from "../ecommerceHeader/ecommerceHeader.component";
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-home',
  imports: [EcommerceHeaderComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponentV2 {

}
