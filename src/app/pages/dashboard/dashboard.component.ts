import { Component, effect, inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { PedidosService } from '../../services/pedidos.service';
import { IPedidos } from '../../interfaces/pedidos.interface';
import { PagosService } from '../../services/pagos.service';
import { IMethodPayment } from '../../interfaces/pagos.interface';
import { reduce } from 'rxjs';
import { statusOrders } from '../pedidos/pedidos.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  pedidosServices = inject(PedidosService);
  pagosServices = inject(PagosService);
  pedidos: IPedidos[] = [];
  metodos: IMethodPayment[] = [];

  ventasData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr'],
    datasets: [
      { data: [0, 0, 0, 0], label: 'Ventas', backgroundColor: '#059bff' }
    ],

  };

  pedidosData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Completados', 'Pendientes', 'Denegados'],
    datasets: [
      { label: 'Pedidos', data: [85, 15, 5], backgroundColor: ['#16a085', '#059bff', '#c0392b'] }
    ]
  };

  metodosDePagoData: ChartConfiguration<'pie'>['data'] = {
    datasets: [
      {
        label: 'Métodos de pagos utilizados',
        data: [5, 10], // Genera valores aleatorios como en tu código original
        backgroundColor: ['#FF6384', '#FF9F40',]
      }
    ]
  };

  productosMasVendidosData: ChartConfiguration<'pie'>['data'] = {
    datasets: [
      {
        label: 'Métodos de pagos utilizados',
        data: [5, 10], // Genera valores aleatorios como en tu código original
        backgroundColor: ['#FF6384', '#FF9F40', '#FFCD56', '#4BC0C0', '#36A2EB']
      }
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    }
  };

  constructor() {
    effect(() => {
      this.pedidos = this.pedidosServices.getPedidos();
      const pedidosAprobados = this.pedidos.filter(ped => ped.status === 'Aprobado');
      const pedidosCreado = this.pedidos.filter(ped => ped.status === 'Creado');
      const pedidosDenegados = this.pedidos.filter(ped => ped.status === 'Denegado');
      this.pedidosData.datasets[0].data = [pedidosAprobados.length, pedidosCreado.length, pedidosDenegados.length]

      this.metodos = this.pagosServices.getMetodosPagos();
      this.metodosDePagoData.labels = this.metodos.map(met => met.type);

      this.ventasData.datasets[0].data[1] = pedidosAprobados.length;

      const reduceFilter = new Set(this.pagosServices.getPagos().map(ty => ty.methodPaymentId));
      const result = [...reduceFilter];

      this.metodosDePagoData.datasets[0].data = result.map(type => {
        return this.pagosServices.getPagos().filter(ty => ty.methodPaymentId === type).length
      })


      const productSales: Record<number, { name: string; totalAmount: number }> = {};

      this.pedidos.forEach(order => {
        order.DetPedidos.forEach(detalle => {
          const productId = detalle.productId;
          const productName = detalle.producto.store.name; // Nombre del producto
          if (!productSales[productId]) {
            productSales[productId] = { name: productName, totalAmount: 0 };
          }
          productSales[productId].totalAmount += detalle.amount;
        });
      });

      console.log(productSales);
      

      // Paso 2: Convertir en array y ordenar por cantidad vendida
      const sortedProducts = Object.entries(productSales)
        .map(([id, data]) => ({ id: Number(id), name: data.name, totalAmount: data.totalAmount }))
        .sort((a, b) => a.totalAmount - b.totalAmount);


      this.productosMasVendidosData.labels = sortedProducts.map(pro => pro.name);

      this.productosMasVendidosData.datasets[0].data = sortedProducts.map(pro => pro.totalAmount)


    })
  }

  ngOnInit(): void {
    this.pedidosServices.getPedidosAPI();
    this.pagosServices.getMetodosPagosAPI();
    this.pagosServices.getPaymentsAPI();
  }

  setClassName(status: statusOrders): string {
    if (status === 'Aprobado') return 'text-green-600';
    if (status === 'Denegado') return 'text-red-600';
    if (status === 'Creado') return 'text-blue-600';
    return 'text-black';
  }
}
