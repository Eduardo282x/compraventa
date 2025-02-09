import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

import { CarritoService } from '../../../services/carrito.service';
@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})
export class EcommerceHeaderComponent {

  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  articlesCarrito = 0;

  constructor() {
    effect(() => {
      this.articlesCarrito = this.carritoService.getCarrito().length;
      this.ref.detectChanges();
    })
  }

}
