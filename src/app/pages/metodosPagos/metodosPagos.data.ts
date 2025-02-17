import { ICliente } from "../../interfaces/cliente.interface";
import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IMethodPayment } from "../../interfaces/pagos.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";

export const columns: IColumns<IMethodPayment>[] = [
    {
        title: 'Banco',
        name: (element) => element.bank,
        nameColumn: 'bank',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Propietario',
        name: (element) => element.owner,
        nameColumn: 'owner',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Razón Social',
        name: (element) => formatNumberWithDots(element.identify, 'V-', ''),
        nameColumn: 'identify',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.email,
        nameColumn: 'email',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Teléfono',
        name: (element) => element.phone,
        nameColumn: 'phone',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Tipo',
        name: (element) => element.type,
        nameColumn: 'type',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Editar',
        name: () => 'edit',
        nameColumn: 'edit',
        type: 'icon',
        icon: 'edit',
        color: 'primary'
    },
    {
        title: 'Eliminar',
        name: () => 'delete',
        nameColumn: 'delete',
        type: 'icon',
        icon: 'delete',
        color: 'warn'
    }
];


export const dataFormMetodosPagos: IDataForm[] = [
    {
        typeInput: 'text',
        label: 'Banco',
        formControl: 'bank',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'text',
        label: 'Propietario',
        formControl: 'owner',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Cédula',
        formControl: 'identify',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Correo Electrónico',
        formControl: 'email',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Teléfono',
        formControl: 'phone',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Tipo',
        formControl: 'type',
        required: true,
        value: '',
    },
    {
        typeInput: 'select',
        label: 'Moneda',
        formControl: 'currencyId',
        required: true,
        value: '',
        option: []
    }
];

export const formDataMetodosPagos: IFormulario = {
    title: 'Métodos de pagos',
    dataForm: dataFormMetodosPagos
}