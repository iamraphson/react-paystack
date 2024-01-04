import {createContext} from 'react';
import {InitializePayment, PaystackProps} from './types';

type IPaystackContext = {
  config: PaystackProps;
  initializePayment: InitializePayment;
  onSuccess: () => void;
  onClose: () => void;
};

const PaystackContext = createContext<IPaystackContext>({
  config: {} as PaystackProps,
  initializePayment: () => null,
  onSuccess: () => null,
  onClose: () => null,
});

export default PaystackContext;
