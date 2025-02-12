
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeComponentV2 } from './pages/Ecommerce/home/home.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { EmpresasComponent } from './pages/empresas/empresas.component';
import { SucursalesComponent } from './pages/sucursales/sucursales.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { CategoryComponent } from './pages/category/category.component';
import { LayoutEcommerceComponent } from './pages/Ecommerce/LayoutEcommerce/LayoutEcommerce.component';
import { EcommerceStepperComponent } from './pages/Ecommerce/ecommerceStepper/ecommerceStepper.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login/adm',
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
                path: 'proveedores',
                component: ProveedoresComponent
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
                path: 'categorias',
                component: CategoryComponent
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
    },
    {
        path: 'comercio',
        component: LayoutEcommerceComponent,
        children: [
            {
                path: '',
                component: HomeComponentV2
            },
            {
                path: 'carrito',
                component: EcommerceStepperComponent
            }
        ]
    }
];
