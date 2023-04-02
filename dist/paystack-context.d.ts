/// <reference types="react" />
import { callback } from './types';
type IPaystackContext = {
    initializePayment: (arg0: callback, arg1: callback) => void;
    onSuccess: () => void;
    onClose: () => void;
};
declare const PaystackContext: import("react").Context<IPaystackContext>;
export default PaystackContext;
