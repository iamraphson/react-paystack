/// <reference types="react" />
import { PaystackProps } from './types';
interface PaystackProviderProps extends PaystackProps {
    children: JSX.Element;
    onSuccess: Function;
    onClose: Function;
}
declare const PaystackProvider: ({ children, onSuccess, onClose, ...others }: PaystackProviderProps) => JSX.Element;
export default PaystackProvider;
