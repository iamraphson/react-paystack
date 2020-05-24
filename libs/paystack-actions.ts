export const callPaystackPop = (paystackArgs: Record<string, any>): void => {
    console.log('callPaystackPop', paystackArgs);
    //@ts-ignore
    const handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs);
    handler && handler.openIframe();
};