import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IInventario } from "../../interfaces/producto.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<IInventario>[] = [
    {
        title: 'Nombre',
        name: (element) => element.prodNom,
        nameColumn: 'prodNom',
        type: 'string',
        width: '20%',
    },
    {
        title: 'Descripción',
        name: (element) => element.prodDescrip || '-',
        nameColumn: 'prodDescrip',
        type: 'string',
        width: '25%',
    },
    {
        title: 'Categoria',
        name: (element) => element.Categoria.nombre || '-',
        nameColumn: 'nombre',
        type: 'string',
        width: '25%',
    },
    {
        title: 'Precio Compra',
        name: (element) => element.prodPcompra,
        nameColumn: 'prodPcompra',
        type: 'string',
        width: 'w-20',
    },
    {
        title: 'Precio Venta',
        name: (element) => element.prodPventa,
        nameColumn: 'prodPventa',
        type: 'string',
        width: 'w-20',
    },
    {
        title: 'Stock',
        name: (element) => element.prodStock,
        nameColumn: 'prodStock',
        type: 'string',
        width: 'w-20',
    },
    {
        title: 'Fecha Vencimiento',
        name: (element) => element.prodFechaven,
        nameColumn: 'prodFechaven',
        type: 'date',
        width: '15%',
    },
    {
        title: 'Estado',
        name: (element) => element.status,
        nameColumn: 'status',
        type: 'boolean',
        width: '10%',
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


export const dataFormInventario: IDataForm[] = [
    {
        typeInput: 'text',
        label: 'Nombre del Producto',
        formControl: 'prodNom',
        required: true,
        value: '',
    },
    {
        typeInput: 'select',
        label: 'Categoría',
        formControl: 'catId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'text',
        label: 'Descripción',
        formControl: 'prodDescrip',
        required: false,
        value: '',
    },
    {
        typeInput: 'number',
        label: 'Precio de Compra',
        formControl: 'prodPcompra',
        required: true,
        value: '',
    },
    {
        typeInput: 'number',
        label: 'Precio de Venta',
        formControl: 'prodPventa',
        required: true,
        value: '',
    },
    {
        typeInput: 'select',
        label: 'Moneda',
        formControl: 'MonedaMonId',
        required: false,
        value: '',
        option: [],
    },
    {
        typeInput: 'number',
        label: 'Stock',
        formControl: 'prodStock',
        required: false,
        value: 0,
    },
    {
        typeInput: 'select',
        label: 'Unidad',
        formControl: 'UnidadUndId',
        required: false,
        value: '',
        option: [],
    },
    {
        typeInput: 'date',
        label: 'Fecha de Vencimiento',
        formControl: 'prodFechaven',
        required: true,
        value: new Date(),
    },
    {
        typeInput: 'checkbox',
        label: 'Estado',
        formControl: 'status',
        required: false,
        value: true,
    },
];

export const formDataInventario: IFormulario = {
    title: 'Inventario',
    dataForm: dataFormInventario
}