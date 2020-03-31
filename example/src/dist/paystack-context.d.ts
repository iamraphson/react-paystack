/// <reference types="react" />
declare type IPaystackContext = {
    initializePayment: Function;
    onSuccess: Function;
    onClose: Function;
};
declare const PaystackContext: import("react").Context<IPaystackContext>;
export default PaystackContext;
