# react-paystack

This is a react library for implementing paystack payment gateway

## Demo

![Demo](React_App_01.png?raw=true "Demo Image")

## Get Started

This React library provides a wrapper to add Paystack Payments to your React application

### Install

```sh
npm install react-paystack --save
```

or with `yarn`

```sh
yarn add react-paystack
```

### Usage

```javascript
    import React from 'react';
    import logo from './logo.svg';
    import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
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
```

Please checkout [Paystack Documentation](https://developers.paystack.co/docs/paystack-inline) for other available options you can add to the tag

## Deployment

REMEMBER TO CHANGE THE KEY WHEN DEPLOYING ON A LIVE/PRODUCTION SYSTEM

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/iamraphson)!

Thanks!
Ayeni Olusegun.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
