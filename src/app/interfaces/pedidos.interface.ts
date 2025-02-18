import { statusOrders } from "../pages/pedidos/pedidos.component";
import { IInventario } from "./producto.interface";

export interface IPedidos {
    id: number;
    clientId: number;
    paymentId: number;
    status: statusOrders;
    total: number;
    createDate: Date;
    cliente: Cliente;
    payment: Payment;
    DetPedidos: DetPedido[];
}

export interface DetPedido {
    id: number;
    orderId: number;
    productId: number;
    producto: IInventario;
    amount: number;
    total: number;
}

export interface Cliente {
    id: number;
    clientName: string;
    clientLastName: string;
    clientRif: string;
    clientPhone: string;
    clientAddress: string;
    clientEmail: string;
    clientPassword: string;
}

export interface Payment {
    id: number;
    namePayer: string;
    lastNamePayer: string;
    identifyPayer: string;
    phonePayer: string;
    emailPayer: string;
    bankPayer: string;
    reference: string;
    methodPaymentId: number;
}
