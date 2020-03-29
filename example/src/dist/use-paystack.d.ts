import { PaystackProps } from './types';
export default function usePaystackPayment(options: PaystackProps): (callback?: Function, onClose?: Function) => void;
