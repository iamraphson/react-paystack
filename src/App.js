import React, { Component } from 'react';
import PaystackButton from './PayStack';
import './App.css';

class App extends Component {

	state = {
		key: "pk_test_a137d402b5975716e89952a898aad2832c961d69", // PAYSTACK PUBLIC KEY
		email: "nsegun5@gmail.com", // customer email
		amount: 10000, //equals NGN100,
		anotherPayment: false
	}


	callback = (response) => {
        console.log(response)
		this.setState({anotherPayment: true})
	}

	close = () => {
		console.log("Payment closed")
	}

	getReference = () => {
		let text = "";
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( let i=0; i < 10; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		console.log(text)
		return text;
	}

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <PaystackButton
						text="Make Payment"
						class="payButton"
						callback={this.callback}
						close={this.close}
	          disabled={false}
	          embed={false}
	          reference={this.getReference()}
	          email={this.state.email}
	          amount={Number(this.state.amount)}
						paystackkey={this.state.key}
          />
        </div>
      </div>
    );
  }
}

export default App;
