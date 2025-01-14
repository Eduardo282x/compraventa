export interface ISucursales {
    sucId:    number;
    empId:    number;
    sucNom:   string;
    fechCrea: Date;
    status:   boolean;
    Empresa:  Empresa;
}

export interface Empresa {
    empId:     number;
    empNom:    string;
    empRuc:    string;
    empCorreo: string;
    empTelf:   string;
    empDirecc: string;
    fechCrea:  Date;
    status:    boolean;
}
