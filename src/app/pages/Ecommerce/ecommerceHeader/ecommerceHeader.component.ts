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
import { SucursalesService } from '../../../services/sucursales.service';
import { ISucursales } from '../../../interfaces/sucursales.interface';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ecommerce-header',
  imports: [MatIconModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatBadgeModule, 
    RouterModule, 
    MatButtonModule, 
    MatBottomSheetModule,
    MatSelectModule
  ],
  templateUrl: './ecommerceHeader.component.html',
  styleUrl: './ecommerceHeader.component.css',
})

export class EcommerceHeaderComponent extends BaseComponent implements OnInit {

  clientInfo: ICliente | null = null;
  moneda: Moneda[] = [];
  sucursal: ISucursales[] = [];
  sucursalSelected: number = 1;
  currencySelected: number = 1;
  category: string = '';
  product: string = '';
  authService = inject(AuthService);
  inventarioService = inject(InventarioService);
  sucursalService = inject(SucursalesService);

  private _bottomSheet = inject(MatBottomSheet);
  carritoService = inject(CarritoService);
  ref = inject(ChangeDetectorRef);

  articlesCarrito = 0;

  constructor() {
    super();
    effect(() => {
      this.articlesCarrito = this.carritoService.getCarrito().length;
      if (this.carritoService.getCarrito().length === 0) {
        this.articlesCarrito = this.carritoService.getCarritoApi().length;
      }
      this.clientInfo = this.authService.setClientInfo();
      this.moneda = this.inventarioService.getMoneda();
      this.sucursal = this.sucursalService.getSucursales();
      this.ref.detectChanges();
    })
  }

  ecommerceHeaderForm = new FormGroup({
    product: new FormControl('')
  });

  ngOnInit(): void {
    const sucursalLocal = localStorage.getItem('sucursalId');
    const currencyLocal = localStorage.getItem('currencyId');
    if (sucursalLocal) {
      this.sucursalSelected = Number(sucursalLocal);
    }
    if (currencyLocal) {
      this.currencySelected = Number(currencyLocal);
    }
    this.routerActive.queryParams
      .subscribe(params => {
        this.category = params['categoria'] ? params['categoria'] : '';
        this.product = params['producto'] ? params['producto'] : '';
      }
      )


    const clientLocal: ICliente | null = JSON.parse(localStorage.getItem('clientToken') as string);
    if (clientLocal) {
      this.authService.clientInfo.set(clientLocal);
      this.carritoService.getCarritoAPI(clientLocal.id.toString())
    }
    this.inventarioService.getMonedaAPI();
    this.sucursalService.getSucursalesAPI();
    this.ref.detectChanges();
  }

  changeSucursal(sucId: number) {
    localStorage.setItem('sucursalId', sucId.toString());
    this.inventarioService.getInventarioFiltradoAPI(this.category, this.product, sucId.toString());
  }

  changeCurrency(currencyId: number) {
    console.log(currencyId);
    localStorage.setItem('currencyId', currencyId.toString());
    this.inventarioService.setCurrency.set(currencyId)
    // this.inventarioService.getInventarioFiltradoAPI(this.category, this.product, currencyId.toString());
  }

  goToCar() {
    if (this.clientInfo) {
      this.router.navigate(['/comercio/carrito']);
    } else {
      this.openBottomSheet()
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(ClientLoginComponent).afterDismissed().subscribe(response => {
      if (response === 'openClientRegister') {
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
