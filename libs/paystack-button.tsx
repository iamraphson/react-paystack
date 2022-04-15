import React, {ReactNode} from 'react';
import usePaystackPayment from './use-paystack';
import {callback, PaystackProps} from './types';

interface PaystackButtonProps extends PaystackProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  onClick?: Function;  // a function that is run before the payment function, if true is returned proceed to the payment function
  onSuccess?: callback;
  onClose?: callback;
}

const PaystackButton = ({
  text,
  className,
  children,
  onSuccess,
  onClose,
  onClick,
  ...others
}: PaystackButtonProps): JSX.Element => {
  const initializePayment = usePaystackPayment(others);
  return (
    <button className={className} onClick={(): void => {
        if (onClick) {
          if(onClick()) { // proceed to payment if true
            initializePayment(onSuccess, onClose);
          }
        } else {
        initializePayment(onSuccess, onClose);
        }
      }}>
      {text || children}
    </button>
  );
};

export default PaystackButton;
