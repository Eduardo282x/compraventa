import { IEmpresas } from "../../interfaces/empresa.interface";
import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<IEmpresas>[] = [
    {
        title: 'Nombre',
        name: (element) => element.companyName,
        nameColumn: 'companyName',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Rif',
        name: (element) => element.companyRuc,
        nameColumn: 'companyRuc',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.companyEmail,
        nameColumn: 'companyEmail',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Teléfono',
        name: (element) => element.companyPhone,
        nameColumn: 'companyPhone',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Dirección',
        name: (element) => element.companyAddress,
        nameColumn: 'companyAddress',
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

export const dataFormEmpresa: IDataForm[] = [
    {
        typeInput: 'text',
        label: 'Nombre',
        formControl: 'companyName',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Ruc',
        formControl: 'companyRuc',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Correo',
        formControl: 'companyEmail',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Teléfono',
        formControl: 'companyPhone',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Dirección',
        formControl: 'companyAddress',
        required: true,
        value: '',
    }
];

export const formDataEmpresa: IFormulario = {
    title: 'Empresa',
    dataForm: dataFormEmpresa
}

