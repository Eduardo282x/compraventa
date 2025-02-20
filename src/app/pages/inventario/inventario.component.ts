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
  dataTable: IInventario[] = [];
  title: string = 'Productos';
  sucursalSelected: number = 1;

  sucursalService = inject(SucursalesService);
  categoryService = inject(CategoryService);
  inventarioService = inject(InventarioService);
  ref = inject(ChangeDetectorRef);

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.inventarioService.getInventario();
      
      const copyDataForm = [...dataFormInventario];

      const findFormStore = copyDataForm.find(form => form.formControl === 'storeId');
      if (findFormStore) {
        findFormStore.option = this.inventarioService.getAlmacen().map(alm => {
          return {
            label: alm.name,
            value: alm.id
          }
        })
      }

      const findFormSucursal = copyDataForm.find(form => form.formControl === 'sucursalId');
      if (findFormSucursal) {
        findFormSucursal.option = this.sucursalService.getSucursales().map(suc => {
          return {
            label: suc.nombre,
            value: suc.sucId
          }
        })
      }

      formDataInventario.dataForm = copyDataForm;
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.inventarioService.getInventarioAPI(1);
    this.inventarioService.getAlmacenAPI();
    this.sucursalService.getSucursalesAPI();
  }

  getSucursal(sucId: number) {
    this.inventarioService.getInventarioAPI(sucId);
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    if (dataComponent.action == 'add') {
      this.openDialog();
    }
    if (dataComponent.action == 'delete') {
      this.deleteData(dataComponent.data);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataInventario,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inventarioService.putInventarioSaveAPI(result);
    })
  }

  deleteData(data: IInventario): void {
    this.inventarioService.deleteInventarioAPI(data.id.toString());
  }
}
