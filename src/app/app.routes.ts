
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
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { MetodosPagosComponent } from './pages/metodosPagos/metodosPagos.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PedidosClienteComponent } from './pages/Ecommerce/pedidosCliente/pedidosCliente.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientProfileComponent } from './pages/Ecommerce/clientProfile/clientProfile.component';
import { PasswordComponent } from './pages/Ecommerce/password/password.component';
import { ForgotPasswordComponent } from './pages/Ecommerce/forgotPassword/forgotPassword.component';

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
        path: 'recuperar',
        component: ForgotPasswordComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                component: DashboardComponent
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
                path: 'pagos',
                component: PaymentsComponent
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
                path: 'metodos-de-pago',
                component: MetodosPagosComponent
            },
            {
                path: 'almacen',
                component: AlmacenComponent
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
            {
                path: 'contrasena',
                component: PasswordComponent
            }
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
            },
            {
                path: 'perfil',
                component: ClientProfileComponent
            },
            {
                path: 'contrasena',
                component: PasswordComponent
            },
            {
                path: 'recuperar',
                component: ForgotPasswordComponent
            },
            {
                path: 'pedidos',
                component: PedidosClienteComponent
            }
        ]
    }
];
