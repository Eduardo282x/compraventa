
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            },
            {
                path: 'clientes',
                component: ClientesComponent
            },
            {
                path: 'pedidos',
                component: PedidosComponent
            },
            {
                path: 'reportes',
                component: ReportesComponent
            },
            {
                path: 'inventario',
                component: InventarioComponent
            },
            {
                path: 'empresas',
                component: EmpresasComponent
            },
            {
                path: 'sucursales',
                component: SucursalesComponent
            },
        ]
    }
];
