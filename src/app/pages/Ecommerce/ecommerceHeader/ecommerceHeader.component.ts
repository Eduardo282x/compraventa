import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';
import { RouterModule } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { ClientLoginComponent } from '../clientLogin/clientLogin.component';
import { CarritoService } from '../../../services/carrito.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, MatBadgeModule, RouterModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})

export class EcommerceHeaderComponent extends BaseComponent {

  private _bottomSheet = inject(MatBottomSheet);
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  articlesCarrito = 0;

  constructor() {
    super();
    effect(() => {
      this.articlesCarrito = this.carritoService.getCarrito().length;
      this.ref.detectChanges();
    })
  }
  
  ecommerceHeaderForm = new FormGroup({
    product: new FormControl('')
  });

  openBottomSheet(): void {
    this._bottomSheet.open(ClientLoginComponent);
  }

  onSubmit() {
    const {product} = this.ecommerceHeaderForm.value;

    this.router.navigate(
      ['/comercio'],
      { queryParams: { producto: `${product}` } }
    );
  }

}
