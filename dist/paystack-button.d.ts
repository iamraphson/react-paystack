import { ReactNode } from 'react';
import { callback, PaystackProps } from './types';
interface PaystackButtonProps extends PaystackProps {
    text?: string;
    className?: string;
    disabled?: boolean;
    children?: ReactNode;
    onSuccess?: callback;
    onClose?: callback;
}
declare const PaystackButton: ({ text, className, children, onSuccess, onClose, disabled, ...config }: PaystackButtonProps) => JSX.Element;
export default PaystackButton;
