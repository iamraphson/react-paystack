import React from 'react';
import { PaystackProps } from './types';
interface PaystacConsumerProps extends PaystackProps {
    children: (arg: Record<string, any>) => any;
    onSuccess?: () => void;
    onClose?: () => void;
}
declare const PaystackConsumer: React.ForwardRefExoticComponent<PaystacConsumerProps & React.RefAttributes<unknown>>;
export default PaystackConsumer;
