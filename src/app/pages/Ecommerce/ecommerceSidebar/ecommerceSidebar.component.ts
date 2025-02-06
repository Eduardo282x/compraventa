import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../interfaces/category.interface';

@Component({
  selector: 'app-ecommerce-sidebar',
  imports: [],
  templateUrl: './ecommerceSidebar.component.html',
  styleUrl: './ecommerceSidebar.component.css',
})
export class EcommerceSidebarComponent implements OnInit {

  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef)

  categoriesMenu: ICategory[] = [];

  constructor() {
    effect(() => {
      this.categoriesMenu = this.categoryService.getCategory();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
      this.categoryService.getCategoryAPI()
  }
}
