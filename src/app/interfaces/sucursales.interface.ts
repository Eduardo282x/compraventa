import { IEmpresas } from "./empresa.interface";

export interface ISucursales {
    sucId:    number;
    empId:    number;
    sucNom:   string;
    fechCrea: Date;
    status:   boolean;
    Empresa:  IEmpresas;
}

