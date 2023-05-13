import React from 'react';
import { PaystackProps, callback } from './types';
interface PaystacConsumerProps extends PaystackProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: callback;
    onClose?: () => void;
}
declare const PaystackConsumer: React.ForwardRefExoticComponent<PaystacConsumerProps & React.RefAttributes<unknown>>;
export default PaystackConsumer;
