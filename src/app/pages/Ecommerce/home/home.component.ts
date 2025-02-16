import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { CardComponent, ICarrito } from "../card/card.component";
import { ICategory } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/category.service';
import { InventarioService } from '../../../services/inventario.service';
import { IInventario } from '../../../interfaces/producto.interface';
import { BaseComponent } from '../../base/base.component';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponentV2 extends BaseComponent implements OnInit {

  productoService = inject(InventarioService);
  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef);
  categoriesMenu: ICategory[] = [];
  productos: IInventario[] = [];
  carritoService = inject(CarritoService);
  sucursalId: string = '1';

  constructor() {
    super();
    effect(() => {
      this.categoriesMenu = this.categoryService.getCategory();
      this.productos = this.productoService.getInventario();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.productoService.getInventarioAPI(1);
    const sucursalLocal = localStorage.getItem('sucursalId');

    const getCarritoLocal: ICarrito[] = JSON.parse(localStorage.getItem('carrito') as string);
    if (getCarritoLocal) {
      this.carritoService.setCarrito.set(getCarritoLocal);
    }
    if (sucursalLocal) {
      this.sucursalId = sucursalLocal
    } else {
      localStorage.setItem('sucursalId', '1')
    }

    this.routerActive.queryParams
      .subscribe(params => {
        const category = params['categoria'] ? params['categoria'] : '';
        const product = params['producto'] ? params['producto'] : '';
        this.productoService.getInventarioFiltradoAPI(category, product, '1');
      }
      )
  }
}
