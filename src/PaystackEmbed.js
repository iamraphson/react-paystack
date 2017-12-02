import React, { Component } from "react";
import PropTypes from "prop-types";

class PaystackEmbed extends Component {
  constructor() {
    super(props);
		this.state = {
			metadata: this.props.metadata || {},
			currency: this.props.currency || "NGN",
			plan: this.props.plan || "",
			quantity: this.props.quantity || "",
			subaccount: this.props.subaccount || "",
			transaction_charge: this.props.transaction_charge || 0,
			bearer: this.props.bearer || ""
		}
  }

  componentDidMount() {
    this.paysWithPaystack()
  }
  
  paysWithPaystack = () =>{
    const handler = window.PaystackPop.setup({
      container: "paystackEmbedContainer",
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
    });
    handler.openIframe();
  }

  render() {
    return (
      <div id="paystackEmbedContainer"></div>
    )
  }
  
}

PaystackEmbed.PropTypes = {
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
	close: PropTypes.func.isRequired
}