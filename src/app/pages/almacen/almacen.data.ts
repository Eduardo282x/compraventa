import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IAlmacen } from "../../interfaces/producto.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<IAlmacen>[] = [
    {
        title: "Nombre",
        name: (element: IAlmacen) => element.name,
        nameColumn: "name",
        type: "string",
        width: "200px"
    },
    {
        title: "Descripción",
        name: (element: IAlmacen) => element.description,
        nameColumn: "description",
        type: "string",
        width: "250px"
    },
    {
        title: "Categoría",
        name: (element: IAlmacen) => element.category.category,
        nameColumn: "category",
        type: "string",
        width: "150px"
    },
    {
        title: "Precio",
        name: (element: IAlmacen) => `${element.price},00 ${element.Moneda.symbol}`,
        nameColumn: "price",
        type: "string",
        width: "100px",
        color: "text-green-500"
    },
    {
        title: "Cantidad",
        name: (element: IAlmacen) => element.amount,
        nameColumn: "amount",
        type: "string",
        width: "100px"
    },
    {
        title: "Proveedor",
        name: (element: IAlmacen) => element.provider.name,
        nameColumn: "provider",
        type: "string",
        width: "200px"
    },
    {
        title: "Unidad",
        name: (element: IAlmacen) => `${element.unit} ${element.unidad.unit}`,
        nameColumn: "unit",
        type: "string",
        width: "100px"
    },
    {
        title: "Fecha de Expiración",
        name: (element: IAlmacen) => element.expirationDate,
        nameColumn: "expirationDate",
        type: "date",
        width: "150px"
    },
    {
        title: "Fecha de Creación",
        name: (element: IAlmacen) => element.createDate,
        nameColumn: "createDate",
        type: "date",
        width: "150px"
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

export const dataFormAlmacen: IDataForm[] = [
    {
        typeInput: "select",
        label: "Categoría",
        formControl: "categoryId",
        required: true,
        value: 0
    },
    {
        typeInput: "text",
        label: "Nombre",
        formControl: "name",
        required: true,
        value: ""
    },
    {
        typeInput: "text",
        label: "Descripción",
        formControl: "description",
        required: true,
        value: ""
    },
    {
        typeInput: "selectText",
        label: "Precio",
        label2: "Moneda",
        formControl: "price",
        formControl2: "currencyId",
        required: true,
        value: '',
        value2: 0
    },
    {
        typeInput: "number",
        label: "Cantidad",
        formControl: "amount",
        required: true,
        value: 0
    },
    {
        typeInput: "select",
        label: "Proveedor",
        formControl: "providerId",
        required: true,
        value: 0
    },
    {
        typeInput: "selectText",
        label: "Unidad",
        label2: "Tipo",
        formControl: "unit",
        formControl2: "unitId",
        required: true,
        value: '',
        value2: 0
    },
    {
        typeInput: "date",
        label: "Fecha de Expiración",
        formControl: "expirationDate",
        required: true,
        value: new Date(),
    }
];

export const formDataAlmacen: IFormulario = {
    title: 'Almacen',
    dataForm: dataFormAlmacen
}


export const dataFormAlmacenIncrease: IDataForm[] = [
    {
        typeInput: "select",
        label: "Producto",
        formControl: "storeId",
        required: true,
        value: 0
    },
    {
        typeInput: "number",
        label: "Cantidad",
        formControl: "amount",
        required: true,
        value: 0
    },
]
export const formDataAlmacenIncrease: IFormulario = {
    title: 'Almacen',
    dataForm: dataFormAlmacenIncrease
}

