import React, {ReactNode} from 'react';
import usePaystackPayment from './use-paystack';
import {callback, PaystackProps} from './types';

interface PaystackButtonProps extends PaystackProps {
  text?: string;
  className?: string;
  children?: ReactNode;
  onSuccess?: callback;
  onClose?: callback;
}

const PaystackButton = ({
  text,
  className,
  children,
  onSuccess,
  onClose,
  ...config
}: PaystackButtonProps): JSX.Element => {
  const initializePayment = usePaystackPayment(config);

  return (
    <button
      className={className}
      onClick={(): void => initializePayment({config, onSuccess, onClose})}
    >
      {text || children}
    </button>
  );
};

export default PaystackButton;
