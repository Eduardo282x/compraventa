import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { BaseComponent } from '../base/base.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { columns } from './empresa.data';
import { EmpresasService } from '../../services/empresas.service';

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
    
  }

  editDataDialog(data: any): void {
    
  }

  deleteData(data: any): void {
    this.empresaService.deleteEmpresasAPI(data.users_ID.toString());
  }
}
