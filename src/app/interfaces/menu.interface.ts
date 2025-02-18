export interface IMenu {
    label: string;
    icon: string;
    redirectTo: string;
    permission: Roles[]
}

export type Roles = 'Administrador' | 'Vendedor' | 'Gerente';