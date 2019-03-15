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
      /*() => {
        if (this.props.embed) {
          this.payWithPaystack();
        }
      }*/
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
        reference
      } = this.state


      const payload = {
        key: paystackkey,
        email,
        amount,
        currency,
        metadata,
        reference,
        onSuccess: (transaction) => callback(transaction),
        onCancel: () => close()
      }

      const paystackInstance  = new window.PaystackPop();
      paystackInstance.newTransaction(payload)

        /*let paystackOptions = {
          key: this.state.paystackkey,
          email: this.state.email,
          amount: this.state.amount,
          ref: this.state.reference,
          metadata: this.state.metadata || {},
          callback: response => {
            this.state.callback(response);
          },
          onClose: () => {
            this.state.close();
          },
          currency: this.state.currency,
          plan: this.state.plan || "",
          quantity: this.state.quantity || "",
          subaccount: this.state.subaccount || "",
          transaction_charge: this.state.transaction_charge || 0,
          bearer: this.state.bearer || "",
        };*/
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
  disabled: PropTypes.bool,
  tag: PropTypes.oneOf(['button', 'a', 'input']),
};

PayStack.defaultProps = {
  tag: 'button',
  text: "Make Payment",
  currency: "NGN",
  disabled: false
};

export default PayStack;
