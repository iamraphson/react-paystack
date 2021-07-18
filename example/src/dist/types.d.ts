declare type Currency = 'NGN' | 'GHS' | 'USD' | 'ZAR';
declare type PaymentChannels = 'bank' | 'card' | 'qr' | 'ussd' | 'mobile_money';
declare type Bearer = 'account' | 'subaccount';
declare type phone = number | string;
interface PaystackCustomFields {
    display_name: string;
    variable_name: string;
    value: any;
}
interface PaystackMetadata {
    custom_fields: PaystackCustomFields[];
}
interface PaystackMetadata {
    [key: string]: any;
}
export interface PaystackProps {
    publicKey: string;
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: phone;
    amount: number;
    reference?: string;
    metadata?: PaystackMetadata;
    currency?: Currency;
    channels?: PaymentChannels[];
    label?: string;
    plan?: string;
    quantity?: number;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: Bearer;
    'data-custom-button'?: string;
    split_code?: string;
    split?: Record<string, any>;
}
export {};
