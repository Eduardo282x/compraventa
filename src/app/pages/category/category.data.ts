import { ICategory } from "../../interfaces/category.interface";
import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<ICategory>[] = [
    {
        title: 'Categoría',
        name: (element) => element.category,
        nameColumn: 'category',
        type: 'string',
        width: 'w-[80%]'
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
        typeInput: 'text',
        label: 'Categoría',
        formControl: 'category',
        required: true,
        value: '',
    }
];

export const formDataCategorias: IFormulario = {
    title: 'Categorías',
    dataForm: dataFormCategorias
}