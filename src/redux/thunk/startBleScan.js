import { bleScan } from './bleScan.js';

export const startBleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        dispatch(bleScan());
        subscription.remove();
      }
    }, true);
  };
};
