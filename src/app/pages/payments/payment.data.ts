import { IPayments } from "../../interfaces/pagos.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";

export const columns: IColumns<IPayments>[] = [
    {
        title: 'Comprador',
        name: (element) => `${element.namePayer} ${element.lastNamePayer}`,
        nameColumn: 'namePayer',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Razón Social',
        name: (element) => formatNumberWithDots(element.identifyPayer,'V-',''),
        nameColumn: 'clientRif',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Teléfono',
        name: (element) => element.phonePayer,
        nameColumn: 'phonePayer',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.emailPayer,
        nameColumn: 'emailPayer',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Banco',
        name: (element) => element.bankPayer,
        nameColumn: 'bankPayer',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Referencia',
        name: (element) => element.reference,
        nameColumn: 'reference',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Método de Pago',
        name: (element) => `${element.methodPayment.bank} \n ${element.methodPayment.owner}`,
        nameColumn: 'paymentMethod',
        type: 'string',
        width: 'w-[30%]'
    },
]