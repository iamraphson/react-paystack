import React, {ReactNode} from 'react';
import usePaystackPayment from './use-paystack';
import {callback, PaystackProps} from './types';

interface PaystackButtonProps extends PaystackProps {
  text?: string;
  className?: string;
  disabled?: boolean;
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
  disabled,
  ...config
}: PaystackButtonProps): JSX.Element => {
  const initializePayment = usePaystackPayment(config);

  return (
    <button
      className={className}
      onClick={(): void => initializePayment({config, onSuccess, onClose})}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};

export default PaystackButton;
