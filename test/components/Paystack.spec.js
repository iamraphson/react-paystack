import React from "react";
import { expect } from "chai";
import { shallow, configure, mount } from "enzyme";
import Paystack from "../../src/PayStack";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

const callback = re => null;
const close = () => null;
const reference = "jjrjrjjr";
const email = "foobar@gmail.com";
const amount = 100;
const btnText = "Pay me,my money";
const key = "PKSD";

describe("Paystack Component", () => {

  it("Paystack renders button", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
        tag="button"
      />
    );
    expect(PaystackWrapper.find("button")).to.have.length(1);
  });

  it("should have customize button text", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
        tag="button"
      />
    );
    expect(PaystackWrapper.text()).to.contain(btnText);
  });

  it("should have an initial text, currency and disabled state", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        callback={callback}
        paystackkey={key}
        tag="button"
      />
    );
    const {
      currency,
      disabled,
      text
    } = PaystackWrapper.state();
    expect(currency).to.equal("NGN");
    expect(text).to.equal("Make Payment");
    expect(disabled).to.be.false;
  });

  it("should have props for reference, email, amount, close, text, callback, plan, embed and paystackkey", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
        tag="button"
      />
    );
    expect(PaystackWrapper.props().email).to.not.be.undefined;
    expect(PaystackWrapper.props().close).to.not.be.undefined;
    expect(PaystackWrapper.props().text).to.not.be.undefined;
    expect(PaystackWrapper.props().callback).to.not.be.undefined;
    expect(PaystackWrapper.props().paystackkey).to.not.be.undefined;
    expect(PaystackWrapper.props().amount).to.not.be.undefined;
    expect(PaystackWrapper.props().reference).to.not.be.undefined;
    expect(PaystackWrapper.props().plan).to.be.undefined;
    expect(PaystackWrapper.props().embed).to.be.undefined;
  });

  it("should render embed div only", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
      />
    );
    PaystackWrapper.setProps({
      embed: true
    });
    expect(PaystackWrapper.find("div")).to.have.length(1);
  });

  it("Called payWithPaystack when button is clicked", done => {
    const payWithPaystackSpy = sinon.mock(Paystack.prototype);
    payWithPaystackSpy.expects("payWithPaystack").once();
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
      />
    );
    PaystackWrapper.find("button").simulate("click");
    payWithPaystackSpy.restore();
    payWithPaystackSpy.verify();
    done();
  });

  it("Loaded Paystack script", () => {
    const PaystackWrapper = mount(
      <Paystack
        reference={reference}
        email={email}
        amount={amount}
        close={close}
        text={btnText}
        callback={callback}
        paystackkey={key}
      />
    );
    const { scriptLoaded } = PaystackWrapper.state();
    expect(scriptLoaded).to.not.be.null;
  });
});
