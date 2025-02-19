export interface IMenu {
    label: string;
    icon: string;
    redirectTo: string;
    includeBagde?: boolean;
    permission: Roles[]
}

export type Roles = 'Administrador' | 'Vendedor' | 'Gerente';