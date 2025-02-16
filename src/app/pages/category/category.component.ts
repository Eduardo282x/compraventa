import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { CategoryService } from '../../services/category.service';
import { SucursalesService } from '../../services/sucursales.service';
import { BaseComponent } from '../base/base.component';
import { columns, dataFormCategorias, formDataCategorias } from './category.data';
import { ICategory } from '../../interfaces/category.interface';

@Component({
  selector: 'app-category',
  imports: [CommonModule, TableComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent extends BaseComponent implements OnInit {
  columns: IColumns<ICategory>[] = columns;
  dataTable: any[] = [];
  title: string = 'Categoría';

  categoryService = inject(CategoryService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.categoryService.getCategory();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategoryAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    if (dataComponent.action == 'add') {
      this.openDialog();
    }
    if (dataComponent.action == 'edit') {
      this.editDataDialog(dataComponent.data);
    }
    if (dataComponent.action == 'delete') {
      this.deleteData(dataComponent.data);
    }
  }

  openDialog(): void {
    const setValues = [...dataFormCategorias];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataCategorias.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataCategorias,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.categoryService.postCategoryAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormCategorias];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataCategorias.dataForm = setValues;
    
    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataCategorias,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id  = data.id ;
      this.categoryService.putCategoryAPI(result);
    })
  }

  deleteData(data: ICategory): void {
    this.categoryService.deleteCategoryAPI(data.id.toString());
  }
}
