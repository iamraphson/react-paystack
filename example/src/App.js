import React from 'react';
import logo from './logo.svg';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from './dist/index.es';
import './App.css';

const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
};

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment()
            }}>Paystack Hooks Implementation</button>
        </div>
    );
};

function App() {
    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess: () => null,
        onClose: () => null
    };

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
        <PaystackConsumer {...componentProps} >
            {({initializePayment}) => <button onClick={() => initializePayment()}>Paystack Consumer Implementation</button>}
        </PaystackConsumer>
    </div>
  );
}

export default App;
