import { IDataForm, IFormulario } from "../../interfaces/form.interface";
import { IColumns } from "../../interfaces/table.interface";
import { IUser } from "../../interfaces/users.interface";

export const columns: IColumns<IUser>[] = [
    {
        title: 'Nombre',
        name: (element) => element.usuNombre,
        nameColumn: 'usuNombre',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Apellido',
        name: (element) => element.usuApellido,
        nameColumn: 'usuApellido',
        type: 'string',
        width: 'w-[30%]'
    },
    {
        title: 'Usuario',
        name: (element) => element.usuCorreo,
        nameColumn: 'usuCorreo',
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
];

export const dataFormUsuarios: IDataForm[] = [
    {
        typeInput: 'select',
        label: 'Sucursal',
        formControl: 'sucId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'select',
        label: 'Rol',
        formControl: 'rolId',
        required: true,
        value: '',
        option: [],
    },
    {
        typeInput: 'text',
        label: 'Nombre de Usuario',
        formControl: 'usuNombre',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Apellido de Usuario',
        formControl: 'usuApellido',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Correo Electrónico',
        formControl: 'usuCorreo',
        required: true,
        value: '',
    },
    {
        typeInput: 'text',
        label: 'Contraseña',
        formControl: 'usuPassword',
        required: true,
        value: '',
    },
    {
        typeInput: 'checkbox',
        label: 'Estado',
        formControl: 'status',
        required: true,
        value: false,
    }
];

export const formDataUsuarios: IFormulario = {
    title: 'Usuarios',
    dataForm: dataFormUsuarios
}