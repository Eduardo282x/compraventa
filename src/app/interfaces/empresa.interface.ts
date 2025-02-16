export interface IEmpresas {
    id: number;
    companyName: string;
    companyRuc: string;
    companyPhone: string;
    companyEmail: string;
    companyAddress: string;
    createDate: Date
}

export interface BodyEmpresa {
    companyName: string;
    companyRuc: string;
    companyPhone: string;
    companyEmail: string;
    companyAddress: string;
}

export interface BodyUpdateEmpresa extends BodyEmpresa {
    id: number;
}