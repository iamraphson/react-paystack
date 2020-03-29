import React, { ReactNode } from 'react';
import { PaystackProps } from './types';
interface PaystackButtonProps extends PaystackProps {
    text?: string;
    className?: string;
    children?: ReactNode;
    onSuccess?: Function;
    onClose?: Function;
}
declare const PaystackButton: ({ text, className, children, onSuccess, onClose, ...others }: PaystackButtonProps) => React.ReactNode;
export default PaystackButton;
