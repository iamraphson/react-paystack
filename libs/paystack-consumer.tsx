import React, {forwardRef, useContext } from 'react';
import PaystackProvider from './paystack-provider';
import {PaystackProps} from './types';
import PaystackContext from './paystack-context';

interface PaystackConsumerProps extends PaystackProps {
  children: (arg: Record<string, any>) => any;
  onSuccess?: () => void;
  onClose?: () => void;
}

interface PaystackConsumerChildProps {
  children: (arg: { initializePayment: () => void; ref: React.Ref<any> }) => React.ReactNode;
}

const PaystackConsumerChild = forwardRef<any, PaystackConsumerChildProps>((props, ref) => {
  const { children } = props;
  const { config, initializePayment, onSuccess, onClose } = useContext(PaystackContext);

  const completeInitializePayment = (): void => initializePayment({ config, onSuccess, onClose });

  return <>{children({ initializePayment: completeInitializePayment, ref })}</>;
});

// eslint-disable-next-line react/display-name
const PaystackConsumer = forwardRef(
  (
    {children, onSuccess: paraSuccess, onClose: paraClose, ...others}: PaystackConsumerProps,
    ref: any,
  ): JSX.Element => {
    const onSuccess = paraSuccess ? paraSuccess : (): any => null;
    const onClose = paraClose ? paraClose : (): any => null;
    return (
      <PaystackProvider {...others} onSuccess={onSuccess} onClose={onClose}>
        <PaystackConsumerChild ref={ref}>{children}</PaystackConsumerChild>
      </PaystackProvider>
    );
  },
);

export default PaystackConsumer;
