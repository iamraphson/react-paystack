import React from 'react';
import {cleanup} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import {callPaystackPop} from '../paystack-actions';
import PaystackConsumer from '../paystack-consumer';
import {config} from './fixtures';

jest.mock('../paystack-actions');

const componentProps = {
  ...config,
  text: 'Pay my damn money',
  onSuccess: (): any => null,
  onClose: (): any => null,
};

describe('<PaystackProvider />', () => {
  beforeEach(() => {
    // @ts-ignore
    callPaystackPop = jest.fn();
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('render PaystackProvider', () => {
    const tree = (
      <PaystackConsumer {...componentProps}>
        {({initializePayment}: Record<string, any>): JSX.Element => (
          <button onClick={(): void => initializePayment()}>Use render props 2000</button>
        )}
      </PaystackConsumer>
    );
    const {getByText}: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText('Use render props 2000'));
    // @ts-ignore
    expect(callPaystackPop).toHaveBeenCalledTimes(1);
  });
});
