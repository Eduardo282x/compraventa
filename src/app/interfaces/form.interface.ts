export interface IFormulario {
    title: string;
    dataForm: IDataForm[];
}

export interface IDataForm {
    typeInput: InputsTypes;
    label: string;
    formControl: string;
    required: boolean;
    value: string | number | boolean;
    option?: IOptions[],
}

export interface IOptions {
    label: string;
    value: string | number
}


export type InputsTypes = 'text' | 'number' | 'date' | 'select' | 'checkbox' | '';
