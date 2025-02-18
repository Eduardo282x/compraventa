import { ICliente } from './cliente.interface';
import { Roles } from './menu.interface';

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponseLogin {
  userData: IUser | ICliente;
  message: string;
  statusCode: number;
  success: boolean;
}

export interface IUser {
  id: number;
  sucId: number;
  rolId: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  status: boolean;
  rol: Rol;
}

export interface Rol {
  id: number;
  rol: Roles;
}

export interface BodyUsuario {
  sucId: number;
  rolId: number;
  usuNombre: string;
  usuApellido: string;
  usuCorreo: string;
  usuPassword: string;
  status: boolean;
}

export interface BodyUpdateUsuario extends BodyUsuario {
  id: number;
}
