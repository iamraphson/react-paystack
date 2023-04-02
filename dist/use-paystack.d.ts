import { PaystackProps } from './types';
export default function usePaystackPayment(options: PaystackProps): (callback?: () => void, onClose?: () => void) => void;
