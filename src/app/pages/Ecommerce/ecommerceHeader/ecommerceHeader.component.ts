import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})
export class EcommerceHeaderComponent { }
