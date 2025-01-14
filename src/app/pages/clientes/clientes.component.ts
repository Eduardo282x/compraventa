import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { columns } from './client.data';
import { ClienteService } from '../../services/clients.service';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';

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
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.clienteServices.getCliente();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.clienteServices.getClienteAPI();
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
    console.log('Abri');
  }

  editDataDialog(data: any): void {
    console.log(data);
  }

  deleteData(data: any): void {
    this.clienteServices.deleteClienteAPI(data.users_ID.toString());
  }
}
