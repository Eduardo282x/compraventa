import { IEmpresas } from "../../interfaces/empresa.interface";
import { IColumns } from "../../interfaces/table.interface";

export const columns: IColumns<IEmpresas>[] = [
    {
        title: 'Nombre',
        name: (element) => element.empNom,
        nameColumn: 'empNom',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Rif',
        name: (element) => element.empRuc,
        nameColumn: 'empRuc',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.empCorreo,
        nameColumn: 'empCorreo',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Telefono',
        name: (element) => element.empTelf,
        nameColumn: 'empTelf',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Direccion',
        name: (element) => element.empDirecc,
        nameColumn: 'empDirecc',
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
