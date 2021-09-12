import React from 'react';
import logo from './logo.svg';
import { usePaystackPayment, PaystackButton, PaystackConsumer } from './dist/index.es';
import './App.css';

const config = {
    reference: (new Date()).getTime().toString(),
    email: "user@example.com",
    amount: 20000,
    publicKey: 'pk_live_9555ee2309d44add3c9dc417fe56d6c9f72f0082',
    firstname: 'cool',
    lastname: 'story',
    split: { //if you want to use transaction split
        "type": "percentage",
        "bearer_type": "all",
        "subaccounts": [
            {
                "subaccount": "ACCT_mtl3xzwjfhcldkw",
                "share": 30
            },
            {
                "subaccount": "ACCT_y19ht107y44o294",
                "share": 20
            }
        ]
    }
};

const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
};

const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
}

const PaystackHookExample = () => {
    const initializePayment = usePaystackPayment(config);
    return (
        <div>
            <button onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Paystack Hooks Implementation</button>
        </div>
    );
};

function App() {
    const componentProps = {
        ...config,
        text: 'Paystack Button Implementation',
        onSuccess,
        onClose
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
