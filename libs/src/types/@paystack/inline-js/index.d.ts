// declare global
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: Record<string, any>) => {
        openIframe: () => void;
      };
    };
  }
}


//@paystack/inline-js/index.d.ts
declare module '@paystack/inline-js';
