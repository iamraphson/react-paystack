import React from 'react';
import { PaystackProps } from './types';
interface PaystacConsumerProps extends PaystackProps {
    children: Function;
    onSuccess?: Function;
    onClose?: Function;
}
declare const PaystackConsumer: React.ForwardRefExoticComponent<PaystacConsumerProps & React.RefAttributes<unknown>>;
export default PaystackConsumer;
