import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { IPedidos } from '../../../interfaces/pedidos.interface';
import { PedidosService } from '../../../services/pedidos.service';
import { statusOrders } from '../../pedidos/pedidos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CurrencyPipe } from '@angular/common';
import { ICliente } from '../../../interfaces/cliente.interface';

@Component({
  selector: 'app-pedidos-cliente',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatExpansionModule],
  templateUrl: './PedidosCliente.component.html',
  styleUrl: './pedidosCliente.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PedidosClienteComponent {

  pedidos: IPedidos[] = [];
  title: string = 'Pedidos';

  pedidosServices = inject(PedidosService);
  ref = inject(ChangeDetectorRef)

  constructor() {
    effect(() => {
      this.pedidos = this.pedidosServices.getPedidos();

      this.ref.detectChanges();
    })
  }

  ngOnInit(): void {
    const cliente: ICliente = JSON.parse(localStorage.getItem('clientToken') as string);
    if(cliente){
      this.pedidosServices.getPedidosByClientAPI(cliente.id);
    }
  }

  setClassName(status: statusOrders): string {
    if(status === 'Aprobado') return 'text-green-600';
    if(status === 'Denegado') return 'text-red-600';
    if(status === 'Creado') return 'text-blue-600';
    return 'text-black';
  }

  updatePedido(pedido: IPedidos, status: statusOrders) {
    const putPedido = {
      id: pedido.id,
      status: status,
    }
    this.pedidosServices.putPedidosAPI(putPedido);
  }

}
