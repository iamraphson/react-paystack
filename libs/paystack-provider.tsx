import React from 'react';
import PaystackContext from './paystack-context';
import usePaystackPayment from './use-paystack';
import {callback, PaystackProps} from './types';

interface PaystackProviderProps extends PaystackProps {
  children: JSX.Element;
  onSuccess: callback;
  onClose: callback;
}

const PaystackProvider = ({
  children,
  onSuccess,
  onClose,
  ...others
}: PaystackProviderProps): JSX.Element => {
  const initializePayment = usePaystackPayment(others);
  return (
    <PaystackContext.Provider value={{initializePayment, onSuccess, onClose}}>
      {children}
    </PaystackContext.Provider>
  );
};

export default PaystackProvider;
