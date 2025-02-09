import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../interfaces/category.interface';
import { BaseComponent } from '../../base/base.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ecommerce-sidebar',
  imports: [RouterLink],
  templateUrl: './ecommerceSidebar.component.html',
  styleUrl: './ecommerceSidebar.component.css',
})
export class EcommerceSidebarComponent extends BaseComponent implements OnInit {

  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef)

  categoriesMenu: ICategory[] = [];

  constructor() {
    super()
    effect(() => {
      this.categoriesMenu = this.categoryService.getCategory();
      this.ref.detectChanges();
    })
  }



  ngOnInit(): void {
      this.categoryService.getCategoryAPI()
  }
}
