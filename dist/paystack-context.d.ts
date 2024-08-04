import { InitializePayment, PaystackProps } from './types';
type IPaystackContext = {
    config: PaystackProps;
    initializePayment: InitializePayment;
    onSuccess: () => void;
    onClose: () => void;
};
declare const PaystackContext: import("react").Context<IPaystackContext>;
export default PaystackContext;
