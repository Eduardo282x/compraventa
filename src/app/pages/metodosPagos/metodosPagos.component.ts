import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { PagosService } from '../../services/pagos.service';
import { IColumns, ISendDataTable } from '../../interfaces/table.interface';
import { BaseComponent } from '../base/base.component';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';
import { IMethodPayment } from '../../interfaces/pagos.interface';
import { columns, dataFormMetodosPagos, formDataMetodosPagos } from './metodosPagos.data';
import { FormComponent } from '../../components/form/form.component';
import { InventarioService } from '../../services/inventario.service';

@Component({
  selector: 'app-metodos-pagos',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './metodosPagos.component.html',
  styleUrl: './metodosPagos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetodosPagosComponent extends BaseComponent implements OnInit {
  columns: IColumns<IMethodPayment>[] = columns;
  dataTable: IMethodPayment[] = [];
  title: string = 'Métodos de pago';

  pagosServices = inject(PagosService);
  inventarioServices = inject(InventarioService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    super();
    effect(() => {
      this.dataTable = this.pagosServices.getMetodosPagos();

      const copyDataForm = [...dataFormMetodosPagos];

      const findFormCurrency = copyDataForm.find(form => form.formControl === 'currencyId');

      if (findFormCurrency) {
        findFormCurrency.option = this.inventarioServices.getMoneda().map(currency => {
          return {
            label: currency.currency,
            value: currency.id
          }
        })
      }
      
      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    this.pagosServices.getMetodosPagosAPI();
    this.inventarioServices.getMonedaAPI();
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
    const setValues = [...dataFormMetodosPagos];
    setValues.map(form => {
      form.value = form.typeInput === 'text' ? '' : false
    });

    formDataMetodosPagos.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataMetodosPagos,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pagosServices.postMetodosPagosAPI(result);
    })
  }

  editDataDialog(data: any): void {
    const setValues = [...dataFormMetodosPagos];
    setValues.map(form => {
      form.value = data[form.formControl]
    });

    formDataMetodosPagos.dataForm = setValues;

    const dialogRef = this.dialog.open(FormComponent, {
      data: formDataMetodosPagos,
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      result.id = data.id;
      this.pagosServices.putMetodosPagosAPI(result);
    })
  }

  deleteData(data: IMethodPayment): void {
    this.pagosServices.deleteMetodosPagosAPI(data.id.toString());
  }
}
