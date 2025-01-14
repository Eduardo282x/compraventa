import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { IChangeStatusUser } from '../../interfaces/users.interface';
import { BaseComponent } from '../base/base.component';
import { columns } from './sucursales.data';
import { SucursalesService } from '../../services/sucursales.service';

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
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.sucursalesService.getSucursales();
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.sucursalesService.getSucursalesAPI();
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
    
  }

  editDataDialog(data: any): void {
    
  }

  deleteData(data: any): void {
    this.sucursalesService.deleteSucursalesAPI(data.users_ID.toString());
  }
}

