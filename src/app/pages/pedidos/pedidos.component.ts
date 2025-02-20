import { ChangeDetectorRef, Component, effect, inject, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { PedidosService } from '../../services/pedidos.service';
import { IPedidos } from '../../interfaces/pedidos.interface';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { getImageUrl } from '../Ecommerce/card/card.component';

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
    if (status === 'Aprobado') return 'text-green-600';
    if (status === 'Denegado') return 'text-red-600';
    if (status === 'Creado') return 'text-blue-600';
    return 'text-black';
  }

  getImageUrl2(image: string) {
    return getImageUrl(image)
  }

  updatePedido(pedido: IPedidos, status: statusOrders) {
    const putPedido = {
      id: pedido.id,
      status: status,
    }
    this.pedidosServices.putPedidosAPI(putPedido);
  }

  generateBill(pedido: IPedidos) {
    this.pedidosServices.descargarFactura(pedido.id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `factura.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error al descargar la factura:', error);
    });
  }
}