import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BaseComponent } from '../base/base.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { columns, dataFormEmpresa, formDataEmpresa } from './empresa.data';
import { EmpresasService } from '../../services/empresas.service';
import { IEmpresas } from '../../interfaces/empresa.interface';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.css'
})
export class EmpresasComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Empresa';

  empresaService = inject(EmpresasService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.empresaService.getEmpresas();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.empresaService.getEmpresasAPI();
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
    const setValues = [...dataFormEmpresa];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataEmpresa.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataEmpresa,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.empresaService.postEmpresasAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormEmpresa];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataEmpresa.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataEmpresa,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id = data.id;
      this.empresaService.putEmpresasAPI(result);
    })
  }

  deleteData(data: IEmpresas): void {
    this.empresaService.deleteEmpresasAPI(data.id.toString());
  }
}
