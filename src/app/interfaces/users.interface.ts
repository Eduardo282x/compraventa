
export interface ILogin {
    usuario: string;
    password: string;
}

export interface IResponseLogin {
    // userAuthenticate: IUser;
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





export interface IBodyUser {
    nombre: string;
    apellido: string;
    usuario: string;
    usersRoleId : number;
    password: string;
}
export interface IBodyUserEdit extends IBodyUser {
    idUsers: number;
}

export interface IChangeStatusUser {
    idUsers: number;
    active: boolean;
}