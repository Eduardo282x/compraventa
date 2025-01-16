export interface IEmpresas {
    empId:     number;
    empNom:    string;
    empRuc:    string;
    empCorreo: string;
    empTelf:   string;
    empDirecc: string;
    fechCrea:  Date;
    status:    boolean;
}


export interface BodyEmpresa {
    empNom: string;
    empRuc: string;
    empCorreo: string;
    empTelf: string;
    empDirecc: string;
    status: boolean;
}

export interface BodyUpdateEmpresa extends BodyEmpresa {
    id: number;
}