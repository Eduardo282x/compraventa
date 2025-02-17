import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { PedidosService } from '../../services/pedidos.service';
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-pedidos',
    standalone: true,
  imports: [TableComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent extends BaseComponent implements OnInit {
  
  columns: IColumns<any>[] = [];
  dataTable: any[] = [];
  title: string = 'Pedidos';

  pagosServices = inject(PedidosService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.pagosServices.getPedidos();

      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.pagosServices.getPedidosAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    console.log(dataComponent);
  }

}