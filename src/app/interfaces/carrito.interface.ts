import { IInventario } from "./producto.interface";

export interface ICarritoAPI {
    id: number;
    productId: number;
    amount: number;
    clientId: number;
    producto: IInventario;
}

export interface BodyCarrito {
    productId: number;
    amount: number;
    clientId: number;
}
export interface BodyUpdateCarrito {
    id: number;
    amount: number;
}