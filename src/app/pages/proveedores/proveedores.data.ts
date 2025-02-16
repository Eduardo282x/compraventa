import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IProveedor } from "../../interfaces/proveedor.interface";
import { IColumns } from "../../interfaces/table.interface";


export const columns: IColumns<IProveedor>[] = [
    {
        title: 'Nombre',
        name: (element: IProveedor) => element.name,
        nameColumn: 'name',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'RUC',
        name: (element: IProveedor) => element.ruc,
        nameColumn: 'ruc',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Teléfono',
        name: (element: IProveedor) => element.phone,
        nameColumn: 'phone',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Dirección',
        name: (element: IProveedor) => element.address,
        nameColumn: 'address',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Correo Electrónico',
        name: (element: IProveedor) => element.email,
        nameColumn: 'email',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Fecha',
        name: (element: IProveedor) => element.createDate,
        nameColumn: 'createDate',
        type: 'date',
        width: 'w-[30%]',
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

export const proveedoresDataForm: IDataForm[] = [
    { typeInput: 'text', label: 'Nombre Proveedor', formControl: 'name', required: true, value: '' },
    { typeInput: 'text', label: 'RUC', formControl: 'ruc', required: true, value: '' },
    { typeInput: 'text', label: 'Teléfono', formControl: 'phone', required: true, value: '' },
    { typeInput: 'text', label: 'Dirección', formControl: 'address', required: true, value: '' },
    { typeInput: 'text', label: 'Correo Electrónico', formControl: 'email', required: true, value: '' },
];

export const formDataProovedor: IFormulario = {
    title: 'Proveedores',
    dataForm: proveedoresDataForm
}