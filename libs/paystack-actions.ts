import PaystackPop from '@paystack/inline-js';

export const callPaystackPop = (paystackArgs: Record<string, any>): void => {
  const paystack = new PaystackPop();
  paystack.newTransaction(paystackArgs);
};
