# react-paystack

This is a react library for implementing paystack payment gateway

### Get Started

This React library provides a wrapper to add Paystack Payments to your React application

### Install
```
npm install https://github.com/iamraphson/react-paystack --save
```

Then go ahead and reference the Paystack inline script in your index.html:
```html
<script src="//js.paystack.co/v1/inline.js"></script>
```

### Usage

```javascript
    import React, { Component } from 'react';
    //import the library
    import PaystackButton from 'react-paystack';
    
    class App extends Component {
    
    	state = {
    		key: "####-####-####-####",
    		email: "foobar@example.com",
    		amount: 10000 //equals NGN100,
    	}
    
    	callback = (response) => {
    		console.log(response); // card charged successfully, get reference here
    	}
    
    	close = () => {
    		console.log("Payment closed");
    	}
    
    	getId = () => {
    		let text = "";
    		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    
    		for( let i=0; i < 15; i++ )
    			text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    		return text;
    	}
    
      render() {
        return (
          <div className="App">
            <p className="App-intro">
              <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                reference={this.getId()}
                email={this.state.email}
                amount={this.state.amount}
                paystackkey={this.state.key}
              />
            </p>
          </div>
        );
      }
    }
    
    export default App;
```
Please checkout [Paystack Documentation](https://developers.paystack.co/docs/paystack-inline) for other available options you can add to the directive

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

