
export interface ILogin {
    email: string;
    password: string;
}

export interface IResponseLogin {
    userData: IUser;
    message:          string;
    statusCode:       number;
    success:          boolean;
}


export interface IUser {
    id:          number;
    sucId:       number;
    rolId:       number;
    usuNombre:   string;
    usuApellido: string;
    usuCorreo:   string;
    usuPassword: string;
    status:      boolean;
    Rol:         Rol;
}

export interface Rol {
    id:  number;
    rol: string;
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