import { ICategory } from "./category.interface";
import { ISucursales } from "./sucursales.interface";

export interface IInventario {
    prodId: number;
    catId: number;
    prodNom: string;
    prodDescrip: string;
    prodPcompra: string;
    prodPventa: number;
    prodStock: number;
    prodFechaven: Date;
    prodImg: null;
    fechCrea: Date;
    status: boolean;
    MonedaMonId: number;
    SucursalSucId: number;
    UnidadUndId: number;
    Categoria: ICategory;
    Moneda: Moneda;
    Sucursal: ISucursales;
    Unidad: Unidad;
}

export interface Moneda {
    monId: number;
    monNom: string;
    fechCrea: Date;
    status: boolean;
}

export interface Unidad {
    undId: number;
    undNom: string;
    fechCrea: Date;
    status: boolean;
}


export interface BodyInventario {
    catId: number;
    prodNom: string;
    prodDescrip?: string;
    prodPcompra: number;
    prodPventa: number;
    prodStock?: number;
    prodFechaven: Date;
    prodImg?: string;
    status?: boolean;
    MonedaMonId?: number;
    SucursalSucId?: number;
    UnidadUndId?: number;
}

export interface BodyUpdateInventory extends BodyInventario {
    prodId: number;
}

export interface IProductoTest {
    id: number;
    title: string;
    category: string;
    price: number;
    amount: number;
}