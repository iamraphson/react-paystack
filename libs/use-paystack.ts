import {useEffect} from 'react';
import {HookConfig, InitializePayment} from './types';
import usePaystackScript from './paystack-script';
import {callPaystackPop} from './paystack-actions';

export default function usePaystackPayment(hookConfig: HookConfig): InitializePayment {
  const [scriptLoaded, scriptError] = usePaystackScript();

  function initializePayment({config, onSuccess, onClose}: Parameters<InitializePayment>[0]): void {
    if (scriptError) {
      throw new Error('Unable to load paystack inline script');
    }

    const args = {...hookConfig, ...config};

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
    } = args;

    if (scriptLoaded) {
      const paystackArgs: Record<string, any> = {
        callback: onSuccess ? onSuccess : () => null,
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
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
        'data-custom-button': args['data-custom-button'] || '',
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
