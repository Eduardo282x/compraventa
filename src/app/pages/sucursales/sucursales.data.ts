import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { ISucursales } from "../../interfaces/sucursales.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<ISucursales>[] = [
    {
        title: 'Sucursal',
        name: (element) => element.nombre,
        nameColumn: 'nombre',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Empresa',
        name: (element) => element.empresa.companyName,
        nameColumn: 'companyName',
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

export const dataFormSucursales: IDataForm[] = [
    {
        typeInput: 'select',
        label: 'Empresa',
        formControl: 'companyId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'text',
        label: 'Nombre',
        formControl: 'nombre',
        required: true,
        value: '',
    }
];

export const formDataSucursales: IFormulario = {
    title: 'Sucursales',
    dataForm: dataFormSucursales
}
