import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IProveedor } from "../../interfaces/proveedor.interface";
import { IColumns } from "../../interfaces/table.interface";


export const columns: IColumns<IProveedor>[] = [
    // {
    //     title: 'Empresa ID',
    //     name: (element: IProveedor) => element.empId,
    //     nameColumn: 'empId',
    //     type: 'string',
    //     width: '100px',
    // },
    {
        title: 'Nombre',
        name: (element: IProveedor) => element.provNom,
        nameColumn: 'provNom',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'RUC',
        name: (element: IProveedor) => element.provRuc,
        nameColumn: 'provRuc',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Teléfono',
        name: (element: IProveedor) => element.provTelf,
        nameColumn: 'provTelf',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Dirección',
        name: (element: IProveedor) => element.provDirecc,
        nameColumn: 'provDirecc',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Correo Electrónico',
        name: (element: IProveedor) => element.provCorreo,
        nameColumn: 'provCorreo',
        type: 'string',
        width: 'w-[30%]',
    },
    {
        title: 'Fecha',
        name: (element: IProveedor) => element.fechCrea,
        nameColumn: 'fechCrea',
        type: 'date',
        width: 'w-[30%]',
    },
    {
        title: 'Estado',
        name: (element: IProveedor) =>  element.status ? 'check' : 'close',
        nameColumn: 'status',
        type: 'iconData',
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
    { typeInput: 'number', label: 'ID Empresa', formControl: 'empId', required: true, value: 0 },
    { typeInput: 'text', label: 'Nombre Proveedor', formControl: 'provNom', required: true, value: '' },
    { typeInput: 'text', label: 'RUC', formControl: 'provRuc', required: true, value: '' },
    { typeInput: 'text', label: 'Teléfono', formControl: 'provTelf', required: true, value: '' },
    { typeInput: 'text', label: 'Dirección', formControl: 'provDirecc', required: true, value: '' },
    { typeInput: 'text', label: 'Correo Electrónico', formControl: 'provCorreo', required: true, value: '' },
    { typeInput: 'checkbox', label: 'Estado', formControl: 'status', required: false, value: true },
];

export const formDataProovedor: IFormulario = {
    title: 'Proveedores',
    dataForm: proveedoresDataForm
}