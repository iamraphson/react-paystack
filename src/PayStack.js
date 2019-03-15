import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class PayStack extends Component {
  constructor(props) {
    super(props);
    this.payWithPaystack = this.payWithPaystack.bind(this);
    this.loadScript = this.loadScript.bind(this);
    this.loadscriptAndUpdateState = this.loadscriptAndUpdateState.bind(this);
    this.state = {
      ...this.props,
      scriptLoaded: null,
      class: this.props.class || this.props.className || ""
    };
  }

  componentDidMount() {
    this.loadscriptAndUpdateState()
  }

  loadscriptAndUpdateState() {
    this.setState(
      {
        scriptLoaded: new Promise(resolve => {
          this.loadScript(() => {
            resolve();
          });
        })
      }
    );
  }

  loadScript(callback) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      // Others
      script.onload = () => {
        callback();
      };
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    for (const index in nextProps) {
      if (nextProps[index] !== prevState[index]) {
        return {
          [index]: nextProps[index]
        }
      }
    }

    return null;
  }

  payWithPaystack() {
    this.state.scriptLoaded &&
      this.state.scriptLoaded.then(() => {
      const {
        paystackkey,
        email,
        amount,
        callback,
        close,
        currency,
        metadata,
        reference,
        error,
        load,
        firstname,
        lastname,
        phone,
        customercode,
        channels,
        paymentrequest,
        paymentpage,
        subaccount,
        bearer,
        transaction_charge,
        plan,
        subscription_count,
        plan_interval,
        subscription_limit,
        subscription_date
      } = this.state

      const payload = {
        key: paystackkey,
        email,
        amount,
        currency,
        metadata,
        reference,
        onSuccess: (transaction) => callback(transaction),
        onCancel: () => close(),
        onLoad: (response) => load(response),
        onError: (response) => error(response),
        firstName: firstname,
        lastName: lastname,
        phone,
        channels,
        paymentRequest: paymentrequest,
        paymentPage: paymentpage,
        subaccountCode: subaccount,
        bearer,
        transactionCharge: transaction_charge,
        subscriptionCount: subscription_count,
        planInterval: plan_interval,
        subscriptionLimit: subscription_limit,
        subscriptionStartDate: subscription_date
      }

      if(customercode){
        payload.customerCode = customercode
      }

      if(plan){
        payload.planCode = plan
      }

      const paystackInstance  = new window.PaystackPop();
      paystackInstance.newTransaction(payload)
    });
  }

  render() {
    const CustomTag = `${this.props.tag}`;
    return (
      <Fragment>
        <CustomTag
          className={this.state.class}
          onClick={this.payWithPaystack}
          disabled={this.state.disabled}
        >
          {this.state.text}
        </CustomTag>
      </Fragment>
    );
  }
}

PayStack.propTypes = {
  text: PropTypes.string,
  class: PropTypes.string,
  tag: PropTypes.oneOf(['button', 'a', 'input']),
  disabled: PropTypes.bool,
  paystackkey: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired, //in kobo
  currency: PropTypes.string,
  email: PropTypes.string.isRequired,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  phone: PropTypes.string,
  customercode: PropTypes.string,
  channels: PropTypes.array,
  paymentrequest: PropTypes.string,
  paymentpage: PropTypes.string,
  metadata: PropTypes.object,
  reference: PropTypes.string.isRequired,
  error: PropTypes.func,
  load: PropTypes.func,
  callback: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  subaccount: PropTypes.string,
  bearer: PropTypes.string,
  transaction_charge: PropTypes.number,
  plan: PropTypes.string,
  subscription_count: PropTypes.number,
  plan_interval: PropTypes.string,
  subscription_limit: PropTypes.number,
  subscription_date: PropTypes.string,

};

PayStack.defaultProps = {
  tag: 'button',
  text: "Make Payment",
  currency: "NGN",
  disabled: false,
  firstname: "",
  lastname: "",
  phone: "",
  customercode: null,
  channels: [],
  paymentrequest: "",
  paymentpage: "",
  error: (res) => {},
  load: (res) => {},
  metadata: null,
  subaccount: "",
  bearer: "",
  transaction_charge: 0,
  subscription_count:0,
  plan: null,
  plan_interval: "",
  subscription_limit: 0,
  subscription_date: "",
};

export default PayStack;
