import { ICategory } from "./category.interface";
import { IProveedor } from "./proveedor.interface";

export interface IAlmacen {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    amount: number;
    expirationDate: Date;
    expirationDate2: string;
    img: string;
    createDate: Date;
    providerId: number;
    currencyId: number;
    unitId: number;
    unit: string;
    provider: IProveedor;
    category: ICategory;
    Moneda: Moneda;
    unidad: Unidad;
}

export interface IInventario {
    amount: number;
    id: number;
    storeId: number;
    sucursalId: number;
    store: IAlmacen;
}

export interface Moneda {
    id: number;
    currency: string;
    symbol: string;
    monNom: string;
}

export interface Unidad {
    id: number;
    unit: string;
}

export interface BodyInventario {
    categoryId: number;
    name: string;
    description: string;
    price: number;
    currencyId: number;
    amount: number;
    providerId: number;
    image: null;
    unit: number;
    unitId: number;
    expirationDate: Date;
    file: string;
    id: number;
}

export type BodyInventarioType = 'categoryId' | 'name' | 'description' | 'price' | 'currencyId' | 'amount' | 'providerId' | 'image' | 'unit' | 'unitId' | 'expirationDate' | 'file' | 'id';


export interface BodyUpdateInventory extends BodyInventario {
    id: number;
}

export interface BodyIncreaseInventory {
    storeId: number;
    amount: number;
}

export interface BodySaveInventoryInSucursal {
    storeId: number;
    sucursalId: number;
    amount: number;
}

export interface IProductoTest {
    id: number;
    title: string;
    category: string;
    price: number;
    amount: number;
}