import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PayStack extends Component {

	constructor(props) {
		super(props);
		this.state = {
			text: this.props.text || "Make Payment",
			class: this.props.class || this.props.className || "",
			metadata: this.props.metadata || {},
			currency: this.props.currency || "NGN",
			plan: this.props.plan || "",
			quantity: this.props.quantity || "",
			subaccount: this.props.subaccount || "",
			transaction_charge: this.props.transaction_charge || 0,
			bearer: this.props.bearer || "",
			disabled: this.props.disabled || false
		}
	}


	componentDidMount() {
		if(this.props.embed){
			this.payWithPaystack()
		}
	}

	payWithPaystack = () => {
		let paystackOptions = {
			key: this.props.paystackkey,
			email: this.props.email,
			amount: this.props.amount,
			ref: this.props.reference,
			metadata: this.state.metadata,
			callback: (response) => {
				this.props.callback(response)
			},
			onClose: () => {
				this.props.close()
			},
			currency: this.state.currency,
			plan: this.state.plan,
			quantity: this.state.quantity,
			subaccount: this.state.subaccount,
			transaction_charge: this.state.transaction_charge,
			bearer: this.state.bearer
		}
		if (this.props.embed) {
			paystackOptions.container = "paystackEmbedContainer"
		}
		const handler = window.PaystackPop.setup(paystackOptions);
		if (!this.props.embed) {
			handler.openIframe();
		}
	}

	render() {
		return this.props.embed ?
			(
				<div id="paystackEmbedContainer"></div>
			)
			:
			(
				<span>
          <button
						type="button"
						className={this.state.class}
						onClick={this.payWithPaystack}
						disabled={this.state.disabled}
					>
            {this.state.text}
          </button>
        </span>
			)
	}
}

PayStack.propTypes = {
	embed: PropTypes.bool,
	text: PropTypes.string,
	class: PropTypes.string,
	metadata: PropTypes.object,
	currency: PropTypes.string,
	plan: PropTypes.string,
	quantity: PropTypes.string,
	subaccount: PropTypes.string,
	transaction_charge: PropTypes.number,
	bearer: PropTypes.string,
	reference: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired, //in kobo
	paystackkey: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired,
	close: PropTypes.func.isRequired,
	disabled: PropTypes.bool
}

export default PayStack;
