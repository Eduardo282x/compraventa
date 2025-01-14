import { ISucursales } from "../../interfaces/sucursales.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<ISucursales>[] = [
    {
        title: 'Sucursal',
        name: (element) => element.sucNom,
        nameColumn: 'sucNom',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Empresa',
        name: (element) => element.Empresa.empNom,
        nameColumn: 'empNom',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Estado',
        name: (element) => element.status ? 'check' : 'close',
        nameColumn: 'status',
        type: 'iconData',
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
]
