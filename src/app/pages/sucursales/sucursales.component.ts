import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { BaseComponent } from '../base/base.component';
import { columns, dataFormSucursales, formDataSucursales } from './sucursales.data';
import { SucursalesService } from '../../services/sucursales.service';
import { FormComponent } from '../../components/form/form.component';
import { ISucursales } from '../../interfaces/sucursales.interface';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './sucursales.component.html',
  styleUrl: './sucursales.component.css'
})
export class SucursalesComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Sucursales';

  sucursalesService = inject(SucursalesService);
  empresaServices = inject(EmpresasService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.sucursalesService.getSucursales();

      const copyDataForm = [...dataFormSucursales];
      const findFormEmp = copyDataForm.find(form => form.formControl === 'empId');
      if (findFormEmp) {
        findFormEmp.option = this.empresaServices.getEmpresas().map(emp => {
          return {
            label: emp.empNom,
            value: emp.empId
          }
        })
      }

      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.sucursalesService.getSucursalesAPI();
    this.empresaServices.getEmpresasAPI();
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
    const setValues = [...dataFormSucursales];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataSucursales.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataSucursales,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sucursalesService.postSucursalesAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormSucursales];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataSucursales.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataSucursales,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.sucId = data.sucId;
      this.sucursalesService.putSucursalesAPI(result);
    })
  }

  deleteData(data: ISucursales): void {
    this.sucursalesService.deleteSucursalesAPI(data.sucId.toString());
  }
}

