import { IEmpresas } from "./empresa.interface";

export interface ISucursales {
    sucId: number;
    empId: number;
    sucNom: string;
    fechCrea: Date;
    status: boolean;
    Empresa: IEmpresas;
}

export interface BodySucursales {
    empId: number;
    sucNom: string;
    status: boolean;
}

export interface BodyUpdateSucursales extends BodySucursales {
    sucId: number;
}