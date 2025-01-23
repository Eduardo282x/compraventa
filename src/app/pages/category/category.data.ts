import { ICategory } from "../../interfaces/category.interface";
import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<ICategory>[] = [
    {
        title: 'Categoría',
        name: (element) => element.nombre,
        nameColumn: 'nombre',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Sucursal',
        name: (element) => element.sucursal.sucNom,
        nameColumn: 'sucNom',
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

export const dataFormCategorias: IDataForm[] = [
    {
        typeInput: 'select',
        label: 'Sucursal',
        formControl: 'sucId',
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

export const formDataCategorias: IFormulario = {
    title: 'Categorías',
    dataForm: dataFormCategorias
}