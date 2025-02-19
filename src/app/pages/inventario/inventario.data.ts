import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IInventario } from "../../interfaces/producto.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";

export const columns: IColumns<IInventario>[] = [
    {
        title: 'Nombre',
        name: (element) => element.store.name,
        nameColumn: 'store.name',
        type: 'string',
        width: '20%',
    },
    {
        title: 'Descripción',
        name: (element) => element.store.description || '-',
        nameColumn: 'store.description',
        type: 'string',
        width: '25%',
    },
    {
        title: 'Categoria',
        name: (element) => element.store.category.category || '-',
        nameColumn: 'store.category.category',
        type: 'string',
        width: '25%',
    },
    {
        title: 'Precio',
        name: (element) => formatNumberWithDots(element.store.price, '', `,00 ${element.store.Moneda.symbol}`),
        nameColumn: 'store.price',
        type: 'string',
        width: 'w-20',
    },
    {
        title: 'Stock',
        name: (element) => element.amount,
        nameColumn: 'amount',
        type: 'string',
        width: 'w-20',
    },
    {
        title: 'Fecha Vencimiento',
        name: (element) => element.store.expirationDate,
        nameColumn: 'store.expirationDate',
        type: 'date',
        width: '15%',
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
        typeInput: 'select',
        label: 'Producto',
        formControl: 'storeId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'select',
        label: 'Sucursal',
        formControl: 'sucursalId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'number',
        label: 'Cantidad',
        formControl: 'amount',
        required: false,
        value: '',
    }
];

export const formDataInventario: IFormulario = {
    title: 'Inventario',
    dataForm: dataFormInventario
}