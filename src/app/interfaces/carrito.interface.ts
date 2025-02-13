import { IInventario } from "./producto.interface";

export interface ICarritoAPI {
    id:       number;
    prodId:   number;
    cant:     number;
    cliId:    number;
    producto: IInventario;
}