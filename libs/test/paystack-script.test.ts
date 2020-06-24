// @ts-ignore
import {renderHook, cleanup} from '@testing-library/react-hooks';
import usePaystackScript from '../paystack-script';

describe('usePaystackScript()', () => {
  afterAll(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  it('adds the script to the dom', () => {
    const {result} = renderHook(() => usePaystackScript());

    expect(result.current[0]).toBe(false);
    expect(result.current[1]).toBe(false);
    expect(document.getElementsByTagName('script')).toBeDefined();
  });

  it('Will not load multi inline script', () => {
    renderHook(() => usePaystackScript());
    const {result} = renderHook(() => usePaystackScript());

    expect(result.current[0]).toBe(true);
    expect(result.current[1]).toBe(false);
    expect(document.getElementsByTagName('script').length).toBe(1);
    expect(document.body.innerHTML).toMatch(new RegExp('https://js.paystack.co/v1/inline.js'));
  });
});
