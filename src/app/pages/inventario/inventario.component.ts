import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { IInventario } from '../../interfaces/producto.interface';
import { FormComponent } from '../../components/form/form.component';
import { ICategory } from '../../interfaces/category.interface';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { CategoryService } from '../../services/category.service';
import { InventarioService } from '../../services/inventario.service';
import { SucursalesService } from '../../services/sucursales.service';
import { BaseComponent } from '../base/base.component';
import { columns, dataFormInventario, formDataInventario } from './inventario.data';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent extends BaseComponent implements OnInit {
  columns: IColumns<IInventario>[] = columns;
  dataTable: any[] = [];
  title: string = 'Productos';

  sucursalService = inject(SucursalesService);
  categoryService = inject(CategoryService);
  inventarioService = inject(InventarioService);
  ref = inject(ChangeDetectorRef);

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.inventarioService.getInventario();

      const copyDataForm = [...dataFormInventario];

      const findFormCategoria = copyDataForm.find(form => form.formControl === 'catId');
      if (findFormCategoria) {
        findFormCategoria.option = this.categoryService.getCategory().map(cat => {
          return {
            label: cat.nombre,
            value: cat.catId
          }
        })
      }

      const findFormUnidad = copyDataForm.find(form => form.formControl === 'MonedaMonId');
      if (findFormUnidad) {
        findFormUnidad.option = this.inventarioService.getMoneda().map(mon => {
          return {
            label: mon.monNom,
            value: mon.monId
          }
        })
      }

      const findFormMoneda = copyDataForm.find(form => form.formControl === 'UnidadUndId');
      if (findFormMoneda) {
        findFormMoneda.option = this.inventarioService.getUnidad().map(uni => {
          return {
            label: uni.undNom,
            value: uni.undId
          }
        })
      }

      formDataInventario.dataForm = copyDataForm;
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.inventarioService.getInventarioAPI();
    this.inventarioService.getMonedaAPI();
    this.inventarioService.getUnidadAPI();
    this.categoryService.getCategoryAPI();
    this.sucursalService.getSucursalesAPI();
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
    const setValues = [...dataFormInventario];
    setValues.map(form => {
      switch (form.typeInput) {
        case 'text':
          form.value = '';
          break;
        case 'number':
          form.value = 0;
          break;
        case 'date':
          form.value = new Date();
          break;
        case 'checkbox':
          form.value = false;
          break;
        default:
          form.value = '';
      }
    });

    formDataInventario.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataInventario,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inventarioService.postInventarioAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormInventario];

    setValues.map(form => {
      switch (form.typeInput) {
        case 'text':
          form.value = data[form.formControl]
          break;
        case 'number':
          form.value = Number(data[form.formControl])
          break;
        case 'select':
          form.value = Number(data[form.formControl])
          break;
        case 'date':
          form.value = new Date(data[form.formControl]);
          break;
        case 'checkbox':
          form.value = data[form.formControl] ? true : false;
          break;
        default:
          form.value = '';
      }
    });

    formDataInventario.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataInventario,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.prodId = data.prodId;
      this.inventarioService.putInventarioAPI(result);
    })
  }

  deleteData(data: IInventario): void {
    this.inventarioService.deleteInventarioAPI(data.prodId.toString());
  }
}
