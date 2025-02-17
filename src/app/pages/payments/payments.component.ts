import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { PagosService } from '../../services/pagos.service';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { TableComponent } from "../../components/table/table.component";
import { columns } from './payment.data';

@Component({
  selector: 'app-payments',
  imports: [TableComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent extends BaseComponent implements OnInit {
  
  columns: IColumns<any>[] = columns;
  dataTable: any[] = [];
  title: string = 'Pagos';

  pagosServices = inject(PagosService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.pagosServices.getPagos();

      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.pagosServices.getPaymentsAPI();
  }

  defectColumnAction(dataComponent: ISendDataTable): void {
    console.log(dataComponent);
  }

}
