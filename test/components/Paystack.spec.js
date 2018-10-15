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
  it("Paystack component renders span", () => {
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
    expect(PaystackWrapper.find("span")).to.have.length(1);
  });

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
      />
    );
    expect(PaystackWrapper.text()).to.contain(btnText);
  });

  it("should have an initial text, currency, transaction_charge and disabled state", () => {
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
    const {
      plan,
      currency,
      disabled,
      transaction_charge
    } = PaystackWrapper.state();
    expect(plan).to.be.empty;
    expect(currency).to.equal("NGN");
    expect(disabled).to.be.false;
    expect(transaction_charge).to.equal(0);
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

  it("try something", done => {
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
});
