import React from 'react';
import { PaystackProps } from './types';
interface PaystackConsumerProps extends PaystackProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: () => void;
    onClose?: () => void;
}
declare const PaystackConsumer: React.ForwardRefExoticComponent<PaystackConsumerProps & React.RefAttributes<unknown>>;
export default PaystackConsumer;
