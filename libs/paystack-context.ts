import {createContext} from 'react';

type IPaystackContext = {
  initializePayment: Function;
  onSuccess: Function;
  onClose: Function;
};

const PaystackContext = createContext<IPaystackContext>({
  initializePayment: () => null,
  onSuccess: () => null,
  onClose: () => null,
});

export default PaystackContext;
