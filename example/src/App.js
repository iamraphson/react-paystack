import React from 'react';
import logo from './logo.svg';
import { usePaystackPayment, PaystackButton } from './dist/index.es';
import './App.css';

const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_test_d8a7e69bada4d0a25d0e62b571b259208c9f4328',
};

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment()
            }}>Use Paystack Hooks to pay 200 NGN</button>
        </div>
    );
};

function App() {
    const componentProps = {
        ...config,
        text: 'Pay my damn money',
        onSuccess: () => null,
        onClose: () => null
    };
    console.log(componentProps);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <PaystackHookExample />
        <PaystackButton {...componentProps} />
    </div>
  );
}

export default App;
