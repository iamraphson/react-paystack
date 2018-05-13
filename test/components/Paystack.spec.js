import React from 'react'
import {expect} from 'chai';
import { shallow, configure } from 'enzyme'
import Paystack from '../../src/PayStack'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

function callback(re) {}
function close(re) {}
const btnText = "Pay me,my money"
const PaystackWrapper = shallow(<Paystack  reference="jjrjrjjr"
                                           email="foobar@gmail.com"
                                           amount={100}
                                           close={close}
                                           text={btnText}
                                           callback={callback}
                                           paystackkey="pksd" />)
describe('Paystack Component', () => {
	it('Paystack component renders span', () => {
		expect(PaystackWrapper.find('span')).to.have.length(1)
	})

	it('Paystack renders button', () => {
		expect(PaystackWrapper.find('button')).to.have.length(1)
	})

	it('should have customize button text', () => {
		expect(PaystackWrapper.text()).to.contain(btnText)
	})

	it('should have an initial text, currency, transaction_charge and disabled state',  () => {
		const { plan, currency, disabled, transaction_charge } = PaystackWrapper.state()
		expect(plan).to.be.empty
		expect(currency).to.equal('NGN')
		expect(disabled).to.be.false
		expect(transaction_charge).to.equal(0)
	});
})