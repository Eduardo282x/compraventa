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