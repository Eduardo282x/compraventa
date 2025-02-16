export interface IFormulario {
    title: string;
    dataForm: IDataForm[];
}

export interface IDataForm {
    typeInput: InputsTypes;
    label: string;
    label2?: string;
    formControl: string;
    formControl2?: string;
    required: boolean;
    value: string | number | boolean | Date;
    value2?: string | number | boolean | Date;
    option?: IOptions[],
}

export interface IOptions {
    label: string;
    value: string | number
}


export type InputsTypes = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'selectText' | '';
