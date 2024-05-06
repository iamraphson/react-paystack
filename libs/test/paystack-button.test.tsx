import React from 'react';
import {cleanup} from '@testing-library/react-hooks';
import {render, fireEvent} from '@testing-library/react';
import {callPaystackPop} from '../paystack-actions';
import PaystackButton from '../paystack-button';
import {config} from './fixtures';

jest.mock('../paystack-actions');

const componentProps = {
  ...config,
  className: 'btn',
  text: 'Pay my damn money',
  onSuccess: (): any => null,
  onClose: (): any => null,
};

describe('<PaystackButton />', () => {
  beforeEach(() => {
    // @ts-ignore
    callPaystackPop = jest.fn();
  });

  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('render PaystackButton', () => {
    const tree = <PaystackButton {...componentProps} />;
    const {getByText}: Record<string, any> = render(tree);
    // Click button
    fireEvent.click(getByText('Pay my damn money'));
    // @ts-ignore
    expect(callPaystackPop).toHaveBeenCalledTimes(1);
  });
});
