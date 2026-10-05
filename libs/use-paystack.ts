import {
  HookConfig,
  InitializePayment,
  InitializePaymentOptions,
  PaystackProps,
  callback,
} from './types';
import {callPaystackPop} from './paystack-actions';

export default function usePaystackPayment(
  hookConfig: HookConfig,
): InitializePayment {
  function initializePayment(
    optionsOrOnSuccess?: InitializePaymentOptions | callback,
    onClose?: callback,
    config?: Omit<PaystackProps, 'publicKey'>,
  ): void {
    let resolvedOnSuccess: callback | undefined;
    let resolvedOnClose: callback | undefined;
    let resolvedConfig: Omit<PaystackProps, 'publicKey'> | undefined;

    if (typeof optionsOrOnSuccess === 'function') {
      resolvedOnSuccess = optionsOrOnSuccess;
      resolvedOnClose = onClose;
      resolvedConfig = config;
    } else if (optionsOrOnSuccess && typeof optionsOrOnSuccess === 'object') {
      resolvedOnSuccess = optionsOrOnSuccess.onSuccess;
      resolvedOnClose = optionsOrOnSuccess.onClose;
      resolvedConfig = optionsOrOnSuccess.config;
    }

    const args = {...hookConfig, ...resolvedConfig};

    const {
      publicKey,
      firstname,
      lastname,
      phone,
      email,
      amount,
      reference,
      metadata,
      currency = 'NGN',
      channels,
      label,
      plan,
      quantity,
      subaccount,
      transaction_charge,
      bearer,
      split,
      split_code,
      connect_account,
      connect_split,
      onBankTransferConfirmationPending,
    } = args;
    const paystackArgs: Record<string, any> = {
      onSuccess: resolvedOnSuccess ? resolvedOnSuccess : () => null,
      onCancel: resolvedOnClose ? resolvedOnClose : () => null,
      key: publicKey,
      email,
      amount,
      ...(firstname && {firstname}),
      ...(lastname && {lastname}),
      ...(phone && {phone}),
      ...(reference && {ref: reference}),
      ...(currency && {currency}),
      ...(channels && {channels}),
      ...(metadata && {metadata}),
      ...(label && {label}),
      ...(onBankTransferConfirmationPending && {onBankTransferConfirmationPending}),
      ...(subaccount && {subaccount}),
      ...(transaction_charge && {transaction_charge}),
      ...(bearer && {bearer}),
      ...(split && {split}),
      ...(split_code && {split_code}),
      ...(plan && {plan}),
      ...(quantity && {quantity}),
      ...(connect_split && {connect_split}),
      ...(connect_account && {connect_account}),
    };

    callPaystackPop(paystackArgs);
  }

  return initializePayment;
}
