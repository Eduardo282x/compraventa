import { IColumns } from "../../interfaces/table.interface";
import { IUser } from "../../interfaces/users.interface";

export const columns: IColumns<IUser>[] = [
    {
        title: 'Nombre',
        name: (element) => element.usuNombre,
        nameColumn: 'nombre',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Apellido',
        name: (element) => element.usuApellido,
        nameColumn: 'apellido',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Usuario',
        name: (element) => element.usuCorreo,
        nameColumn: 'usuario',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Rol',
        name: (element) => element.Rol.rol,
        nameColumn: 'roles_nombre',
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
