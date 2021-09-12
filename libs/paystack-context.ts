import {createContext} from 'react';
import {callback} from './types';
type IPaystackContext = {
  initializePayment: (arg0: callback, arg1: callback) => void;
  onSuccess: () => void;
  onClose: () => void;
};

const PaystackContext = createContext<IPaystackContext>({
  initializePayment: () => null,
  onSuccess: () => null,
  onClose: () => null,
});

export default PaystackContext;
