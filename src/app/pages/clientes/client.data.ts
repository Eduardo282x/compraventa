import { ICliente } from "../../interfaces/cliente.interface";
import { IColumns } from "../../interfaces/table.interface";
import { formatNumberWithDots } from "../../utils/formaters";

export const columns: IColumns<ICliente>[] = [
    {
        title: 'Nombre',
        name: (element) => element.cliNombre,
        nameColumn: 'cliNombre',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Razón Social',
        name: (element) => formatNumberWithDots(element.cliRif,'V-',''),
        nameColumn: 'cliRif',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Correo',
        name: (element) => element.cliCorreo,
        nameColumn: 'cliCorreo',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Teléfono',
        name: (element) => element.cliTelefono,
        nameColumn: 'cliTelefono',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Direccion',
        name: (element) => element.cliDireccion,
        nameColumn: 'cliDireccion',
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
