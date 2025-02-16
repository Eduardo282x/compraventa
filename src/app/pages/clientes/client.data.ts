import { ICliente } from "../../interfaces/cliente.interface";
import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";

export const columns: IColumns<ICliente>[] = [
    {
        title: 'Nombre',
        name: (element) => element.clientName,
        nameColumn: 'clientName',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Razón Social',
        name: (element) => formatNumberWithDots(element.clientRif,'V-',''),
        nameColumn: 'clientRif',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.clientEmail,
        nameColumn: 'clientEmail',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Teléfono',
        name: (element) => element.clientPhone,
        nameColumn: 'clientPhone',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Direccion',
        name: (element) => element.clientAddress,
        nameColumn: 'clientAddress',
        type: 'string',
        width: 'w-[30%]'
    }
]