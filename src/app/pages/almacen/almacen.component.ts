import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { TableComponent } from '../../components/table/table.component';
import { IEmpresas } from '../../interfaces/empresa.interface';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { BaseComponent } from '../base/base.component';
import { calcularDiferenciaMeses, columns, dataFormAlmacen, dataFormAlmacenIncrease, formDataAlmacen, formDataAlmacenIncrease } from './almacen.data';
import { InventarioService } from '../../services/inventario.service';
import { ProveedorService } from '../../services/proveedor.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-almacen',
  imports: [CommonModule, TableComponent],
  standalone: true,
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlmacenComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Almacén';

  inventoryService = inject(InventarioService);
  categoryService = inject(CategoryService);
  providerService = inject(ProveedorService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.inventoryService.getAlmacen().map(pro => {
        return {
          ...pro,
          expirationDate2: calcularDiferenciaMeses(pro.expirationDate.toString())
        }
      });

      const copyDataFormIncrease = [...dataFormAlmacenIncrease];

      const findFormProduct = copyDataFormIncrease.find(form => form.formControl === 'storeId');
      if (findFormProduct) {
        findFormProduct.option = this.inventoryService.getAlmacen().map(alm => {
          return {
            label: `${alm.name} - ${alm.provider.name}`,
            value: alm.id
          }
        })
      }

      const copyDataForm = [...dataFormAlmacen];

      const findFormProveedor = copyDataForm.find(form => form.formControl === 'providerId');
      if (findFormProveedor) {
        findFormProveedor.option = this.providerService.getProveedor().map(pro => {
          return {
            label: pro.name,
            value: pro.id
          }
        })
      }

      const findFormCategoria = copyDataForm.find(form => form.formControl === 'categoryId');
      if (findFormCategoria) {
        findFormCategoria.option = this.categoryService.getCategory().map(cat => {
          return {
            label: cat.category,
            value: cat.id
          }
        })
      }

      const findFormUnidad = copyDataForm.find(form => form.formControl2 === 'currencyId');
      if (findFormUnidad) {
        findFormUnidad.option = this.inventoryService.getMoneda().map(mon => {
          return {
            label: mon.currency,
            value: mon.id
          }
        })
      }

      const findFormMoneda = copyDataForm.find(form => form.formControl2 === 'unitId');
      if (findFormMoneda) {
        findFormMoneda.option = this.inventoryService.getUnidad().map(uni => {
          return {
            label: uni.unit,
            value: uni.id
          }
        })
      }

      formDataAlmacen.dataForm = copyDataForm;

      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.inventoryService.getAlmacenAPI();
    this.inventoryService.getMonedaAPI();
    this.inventoryService.getUnidadAPI();
    this.categoryService.getCategoryAPI();
    this.providerService.getProveedorAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    if (dataComponent.action == 'add') {
      this.openDialog();
    }
    if (dataComponent.action == 'second') {
      this.openDialogToUpdate();
    }
    if (dataComponent.action == 'edit') {
      this.editDataDialog(dataComponent.data);
    }
    if (dataComponent.action == 'delete') {
      this.deleteData(dataComponent.data);
    }
  }

  openDialogToUpdate(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataAlmacenIncrease,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inventoryService.putInventarioIncreaseAPI(result);
    })
  }

  openDialog(): void {
    const setValues = [...dataFormAlmacen];
    setValues.map(form => {
      if (form.typeInput === 'text') {
        form.value = '';
      }
      if (form.typeInput === 'number') {
        form.value = 0;
      }
      if (form.typeInput === 'date') {
        form.value = new Date();
      }
      if (form.typeInput === 'select') {
        form.value = 0;
      }
      if (form.typeInput === 'checkbox') {
        form.value = false;
      }
    });

    formDataAlmacen.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataAlmacen,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inventoryService.postInventarioAPI(result.form, result.base64Image,result.fileName);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormAlmacen];
    setValues.map(form => {
      form.value = data[form.formControl]
      if (form.formControl2) {
        form.value2 = data[form.formControl2]
      }
    });

    formDataAlmacen.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataAlmacen,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      // result.price = Number(data.price);
      // result.unit = Number(data.unit);
      result.form.id = data.id.toString();
      // this.inventoryService.putInventarioAPI(result);
      
      this.inventoryService.putInventarioAPI(result.form, result.base64Image,result.fileName);
    })
  }

  deleteData(data: IEmpresas): void {
    this.inventoryService.deleteInventarioAPI(data.id.toString());
  }
}
