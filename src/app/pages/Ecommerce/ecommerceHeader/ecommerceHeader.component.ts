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
import { ClientRegisterComponent } from '../clientRegister/clientRegister.component';
import { InventarioService } from '../../../services/inventario.service';
import { Moneda } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, MatButtonModule, ReactiveFormsModule, MatBadgeModule, RouterModule, MatButtonModule, MatBottomSheetModule],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})

export class EcommerceHeaderComponent extends BaseComponent implements OnInit {

  clientInfo: ICliente | null = null;
  moneda: Moneda[] = [];
  authService = inject(AuthService);
  inventarioService = inject(InventarioService);

  private _bottomSheet = inject(MatBottomSheet);
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  articlesCarrito = 0;

  constructor() {
    super();
    effect(() => {
      this.articlesCarrito = this.carritoService.getCarrito().length;
      if(this.carritoService.getCarrito().length === 0){
        this.articlesCarrito = this.carritoService.getCarritoApi().length;
      }
      this.clientInfo = this.authService.setClientInfo();
      this.moneda = this.inventarioService.getMoneda();
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
      this.carritoService.getCarritoAPI(clientLocal.cliId.toString())
    }
    this.inventarioService.getMonedaAPI();
  }

  goToCar() {
    if(this.clientInfo){
      this.router.navigate(['/comercio/carrito']);
    } else {
      this.openBottomSheet()
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ClientLoginComponent).afterDismissed().subscribe(response => {
      if(response === 'openClientRegister'){
        this._bottomSheet.open(ClientRegisterComponent)
      }
    })
  }

  onSubmit() {
    const { product } = this.ecommerceHeaderForm.value;

    this.router.navigate(
      ['/comercio'],
      { queryParams: { producto: `${product}` } }
    );
  }

}
