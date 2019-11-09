import React, { Fragment,useEffect,useState } from "react";
import PropTypes from "prop-types";


function PayStack(props) {
  const psState = {
    ...props,
    scriptLoaded:null,
    class: props.class || props.className || ""
  }
  const [payStackState,setPayStackState] = useState(psState);

  useEffect(() => {
       loadscriptAndUpdateState()
      if(payStackState.scriptLoaded){
        payWithPaystack()
      }
  },[payStackState,loadscriptAndUpdateState,payWithPaystack])

  const payWithPaystack = () => {
    payStackState.scriptLoaded &&
    payStackState.scriptLoaded.then(() => {
        let paystackOptions = {
          key: payStackState.paystackkey,
          email: payStackState.email,
          amount: payStackState.amount,
          ref: payStackState.reference,
          metadata: payStackState.metadata || {},
          callback: response => {
            payStackState.callback(response);
          },
          onClose: () => {
            payStackState.close();
          },
          currency: payStackState.currency,
          plan: payStackState.plan || "",
          quantity: payStackState.quantity || "",
          subaccount: payStackState.subaccount || "",
          transaction_charge: payStackState.transaction_charge || 0,
          bearer: payStackState.bearer || "",
        };
        if (payStackState.embed) {
          paystackOptions.container = "paystackEmbedContainer";
        }
        const handler = window.PaystackPop.setup(paystackOptions);
        if (!payStackState.embed) {
          handler.openIframe();
        }
      });
  }

  const loadScript = (callback) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
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

  const loadscriptAndUpdateState = () => {
    setPayStackState(
      {...payStackState,
        scriptLoaded: new Promise(resolve => {
          loadScript(() => {
            resolve();
          });
        })
      },
      () => {
        if (props.embed) {
          payWithPaystack();
        }
      }
    );
  }
    const CustomTag = `${props.tag}`;
    return props.embed ? (
      <div id="paystackEmbedContainer" />
    ) : (
      <Fragment>
        <CustomTag
          className={payStackState.class}
          onClick={payWithPaystack}
          disabled={payStackState.disabled}
        >
          {payStackState.text}
        </CustomTag>
      </Fragment>
    );
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
