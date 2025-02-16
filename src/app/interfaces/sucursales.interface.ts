import { IEmpresas } from "./empresa.interface";

export interface ISucursales {
    sucId: number;
    companyId: number;
    nombre: string;
    empresa: IEmpresas;
}

export interface BodySucursales {
    empId: number;
    sucNom: string;
    status: boolean;
}

export interface BodyUpdateSucursales extends BodySucursales {
    sucId: number;
}