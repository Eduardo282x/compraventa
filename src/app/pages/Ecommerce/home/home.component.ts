import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { ICategory } from '../../../interfaces/category.interface';
import { CategoryService } from '../../../services/category.service';
import { InventarioService } from '../../../services/inventario.service';
import { IInventario } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponentV2 implements OnInit {

  productoService = inject(InventarioService);
  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef);
  categoriesMenu: ICategory[] = [];
  productos: IInventario[] = [];

  constructor() {
    effect(() => {
      this.categoriesMenu = this.categoryService.getCategory();
      this.productos = this.productoService.getInventario();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.productoService.getInventarioAPI();
  }

}
