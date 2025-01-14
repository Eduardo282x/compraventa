export interface ICliente {
    cliId:        number;
    empId:        number;
    cliNombre:    string;
    cliRif:       string;
    cliTelefono:  string;
    cliDireccion: string;
    cliCorreo:    string;
    fechCrea:     Date;
    status:       boolean;
}
