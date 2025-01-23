import { ISucursales } from "./sucursales.interface";

export interface ICategory {
    catId:    number;
    sucId:    number;
    nombre:   string;
    sucursal: ISucursales;
}

export interface BodyCategory {
    sucId: number;
    nombre: string;
}

export interface BodyUpdateCategories extends BodyCategory {
    catId: number;
}