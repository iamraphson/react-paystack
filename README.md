# react-paystack

This is a react library for implementing paystack payment gateway

###Demo

![Alt text](React_App.png?raw=true "Demo Image")

### Get Started

This React library provides a wrapper to add Paystack Payments to your React application

### Install
```
npm install react-paystack --save
```

### Usage

```javascript
    import React, { Component } from 'react';
    //import the library
    import PaystackButton from 'react-paystack';

    class App extends Component {

    	state = {
    		key: "pk_test_########################################", //PAYSTACK PUBLIC KEY
    		email: "foobar@example.com",  // customer email
    		amount: 10000 //equals NGN100,
    	}

    	callback = (response) => {
    		console.log(response); // card charged successfully, get reference here
    	}

    	close = () => {
    		console.log("Payment closed");
    	}

    	getReference = () => {
    		//you can put any unique reference implementation code here
    		let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    		for( let i=0; i < 15; i++ )
    			text += possible.charAt(Math.floor(Math.random() * possible.length));

    		return text;
    	}

      render() {
        return (
          <div>
            <p>
              <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={this.callback}
                close={this.close}
                disabled={true} {/*disable payment button*/}
                embed={true} {/*payment embed in your app instead of a pop up*/}
                reference={this.getReference()}
                email={this.state.email}
                amount={this.state.amount}
                paystackkey={this.state.key}
                tag="button"{/*it can be button or a or input tag */}
              />
            </p>
          </div>
        );
      }
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

