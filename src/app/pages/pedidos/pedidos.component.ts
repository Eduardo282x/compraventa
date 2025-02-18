import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { PedidosService } from '../../services/pedidos.service';
import { IPedidos } from '../../interfaces/pedidos.interface';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

export type statusOrders = 'Creado' | 'Aprobado' | 'Denegado' | 'Eliminado';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatExpansionModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {

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
    this.pedidosServices.getPedidosAPI();
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

  generateBill() {
    console.log('Imprimir');
    
  }
}