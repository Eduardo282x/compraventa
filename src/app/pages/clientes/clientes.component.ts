import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { columns, dataFormClientes, formDataClientes } from './client.data';
import { ClienteService } from '../../services/clients.service';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { ICliente } from '../../interfaces/cliente.interface';
import { EmpresasService } from '../../services/empresas.service';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent extends BaseComponent implements OnInit {
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Clientes';

  clienteServices = inject(ClienteService);
  empresaServices = inject(EmpresasService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.clienteServices.getCliente();


      const copyDataForm = [...dataFormClientes];
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
    this.clienteServices.getClienteAPI();
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
    const setValues = [...dataFormClientes];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataClientes.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataClientes,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clienteServices.postClienteAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormClientes];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataClientes.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataClientes,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id = data.cliId;
      this.clienteServices.putClienteAPI(result);
    })
  }

  deleteData(data: ICliente): void {
    this.clienteServices.deleteClienteAPI(data.cliId.toString());
  }
}
