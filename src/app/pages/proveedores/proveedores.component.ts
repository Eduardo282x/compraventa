import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BaseComponent } from '../base/base.component';
import { FormComponent } from '../../components/form/form.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { ProveedorService } from '../../services/proveedor.service';
import { IProveedor } from '../../interfaces/proveedor.interface';
import { columns, formDataProovedor, proveedoresDataForm } from './proveedores.data';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Proveedores';

  proveedorServices = inject(ProveedorService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.proveedorServices.getProveedor();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.proveedorServices.getProveedorAPI();
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
    const setValues = [...proveedoresDataForm];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataProovedor.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataProovedor,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.proveedorServices.postProveedorAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...proveedoresDataForm];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataProovedor.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataProovedor,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.provId = data.provId;
      this.proveedorServices.putProveedorAPI(result);
    })
  }

  deleteData(data: IProveedor): void {
    this.proveedorServices.deleteProveedorAPI(data.provId.toString());
  }
}
