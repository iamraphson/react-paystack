import { ReactNode } from 'react';
import { callback, PaystackProps } from './types';
interface PaystackButtonProps extends PaystackProps {
    text?: string;
    className?: string;
    children?: ReactNode;
    onSuccess?: callback;
    onClose?: callback;
}
declare const PaystackButton: ({ text, className, children, onSuccess, onClose, ...others }: PaystackButtonProps) => JSX.Element;
export default PaystackButton;
