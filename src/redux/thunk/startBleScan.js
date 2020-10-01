import { bleScan } from './bleScan.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { INITIALIZED } from '../../constants/bleManagerStatus.js';

export const startBleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        dispatch(updateStatus(INITIALIZED));
        dispatch(bleScan());
        subscription.remove();
      }
    }, true);
  };
};
