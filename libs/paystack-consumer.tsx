import React, {forwardRef, useContext, FunctionComponentElement} from 'react';
import PaystackProvider from './paystack-provider';
import {PaystackProps} from './types';
import PaystackContext from './paystack-context';

interface PaystacConsumerProps extends PaystackProps {
  children: (arg: Record<string, any>) => any;
  onSuccess?: () => void;
  onClose?: () => void;
}

const PaystackConsumerChild = ({
  children,
  ref,
}: {
  children: any;
  ref: any;
}): FunctionComponentElement<any> => {
  const {initializePayment, onSuccess, onClose} = useContext(PaystackContext);
  const completeInitializePayment = (): void => initializePayment(onSuccess, onClose);
  return children({initializePayment: completeInitializePayment, ref});
};

// eslint-disable-next-line react/display-name
const PaystackConsumer = forwardRef(
  (
    {children, onSuccess: paraSuccess, onClose: paraClose, ...others}: PaystacConsumerProps,
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
