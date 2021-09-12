import {useEffect} from 'react';
import {callback, PaystackProps} from './types';
import usePaystackScript from './paystack-script';
import {callPaystackPop} from './paystack-actions';

export default function usePaystackPayment(
  options: PaystackProps,
): (callback?: () => void, onClose?: () => void) => void {
  const [scriptLoaded, scriptError] = usePaystackScript();
  const {
    publicKey,
    firstname,
    lastname,
    phone,
    email,
    amount,
    reference,
    metadata = {},
    currency = 'NGN',
    channels,
    label = '',
    plan = '',
    quantity = '',
    subaccount = '',
    transaction_charge = 0,
    bearer = 'account',
    split,
    split_code,
  } = options;

  function initializePayment(callback?: callback, onClose?: callback): void {
    if (scriptError) {
      throw new Error('Unable to load paystack inline script');
    }

    if (scriptLoaded) {
      const paystackArgs: Record<string, any> = {
        callback: callback ? callback : () => null,
        onClose: onClose ? onClose : () => null,
        key: publicKey,
        ref: reference,
        email,
        firstname,
        lastname,
        phone,
        amount,
        currency,
        plan,
        quantity,
        'data-custom-button': options['data-custom-button'] || '',
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
      };
      callPaystackPop(paystackArgs);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load paystack inline script');
    }
  }, [scriptError]);

  return initializePayment;
}
