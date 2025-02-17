export interface IMethodPayment {
    id:         number;
    bank:       string;
    identify:   string;
    email:      string;
    phone:      string;
    owner:      string;
    type:       string;
    currencyId: number;
}

export interface IPayments {
    id:              number;
    namePayer:       string;
    lastNamePayer:   string;
    identifyPayer:   string;
    phonePayer:      string;
    emailPayer:      string;
    bankPayer:       string;
    reference:       string;
    methodPaymentId: number;
    methodPayment:   IMethodPayment;
}