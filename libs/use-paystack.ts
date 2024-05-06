import {HookConfig, InitializePayment} from './types';
import {callPaystackPop} from './paystack-actions';

export default function usePaystackPayment(hookConfig: HookConfig): InitializePayment {
  function initializePayment({config, onSuccess, onClose}: Parameters<InitializePayment>[0]): void {
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
      connect_account,
      connect_split,
    } = args;
    const paystackArgs: Record<string, any> = {
      onSuccess: onSuccess ? onSuccess : () => null,
      onCancel: onClose ? onClose : () => null,
      key: publicKey,
      ref: reference,
      email,
      firstname,
      lastname,
      amount,
      currency,
      plan,
      subaccount,
      transaction_charge,
      bearer,
      label,
      metadata,
    };

    if (phone) {
      paystackArgs.phone = phone;
    }

    if (quantity) {
      paystackArgs.quantity = quantity;
    }

    if (channels) {
      paystackArgs.channels = channels;
    }

    if (split) {
      paystackArgs.split = split;
    }

    if (split_code) {
      paystackArgs.split_code = split_code;
    }

    if (connect_split) {
      paystackArgs.connect_split = connect_split;
    }

    if (connect_account) {
      paystackArgs.connect_account = connect_account;
    }

    if (args['data-custom-button']) {
      paystackArgs['data-custom-button'] = args['data-custom-button'];
    }

    callPaystackPop(paystackArgs);
  }

  return initializePayment;
}
