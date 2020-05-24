import React, {ReactNode} from 'react';
import usePaystackPayment from './use-paystack';
import {PaystackProps} from './types';

interface PaystackButtonProps extends PaystackProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  onSuccess?: Function;
  onClose?: Function;
}

const PaystackButton = ({
  text,
  className,
  children,
  onSuccess,
  onClose,
  ...others
}: PaystackButtonProps): JSX.Element => {
  const initializePayment = usePaystackPayment(others);
  return (
    <button className={className} onClick={(): void => initializePayment(onSuccess, onClose)}>
      {text || children}
    </button>
  );
};

export default PaystackButton;
