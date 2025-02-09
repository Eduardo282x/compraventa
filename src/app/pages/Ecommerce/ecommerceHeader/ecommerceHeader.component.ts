import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
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
import { AuthService } from '../../../services/auth.service';
import { CarritoService } from '../../../services/carrito.service';
import { MatBadgeModule } from '@angular/material/badge';
import { ICliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, MatBadgeModule, RouterModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})

export class EcommerceHeaderComponent extends BaseComponent implements OnInit {

  clientInfo: ICliente | null = null;
  authService = inject(AuthService);

  private _bottomSheet = inject(MatBottomSheet);
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  articlesCarrito = 0;

  constructor() {
    super();
    effect(() => {
      this.articlesCarrito = this.carritoService.getCarrito().length;
      this.clientInfo = this.authService.setClientInfo();
      this.ref.detectChanges();
    })
  }

  ecommerceHeaderForm = new FormGroup({
    product: new FormControl('')
  });

  ngOnInit(): void {
    const clientLocal: ICliente | null = JSON.parse(localStorage.getItem('clientToken') as string);
    if (clientLocal) {
      this.authService.clientInfo.set(clientLocal);
    }

  }

  openBottomSheet(): void {
    this._bottomSheet.open(ClientLoginComponent);
  }

  onSubmit() {
    const { product } = this.ecommerceHeaderForm.value;

    this.router.navigate(
      ['/comercio'],
      { queryParams: { producto: `${product}` } }
    );
  }

}
