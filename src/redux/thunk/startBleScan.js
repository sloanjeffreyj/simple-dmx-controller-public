import { bleScan } from './bleScan.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { INITIALIZED } from '../../constants/bleManagerStatus.js';
import { requestBlePermission } from '../../helpers/requestBlePermission.js';

export const startBleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        requestBlePermission();
        dispatch(updateStatus(INITIALIZED));
        dispatch(bleScan());
        subscription.remove();
      }
    }, true);
  };
};
