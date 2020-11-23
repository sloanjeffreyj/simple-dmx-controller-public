import { bleScan } from './bleScan.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { INITIALIZED, MISSING_BLE_PERMISSION } from '../../constants/bleManagerStatus.js';
import { requestBlePermission } from '../../helpers/requestBlePermission.js';

export const startBleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    const subscription = DeviceManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        const blePermissionGranted = requestBlePermission()
        .then(() => {
          if (blePermissionGranted) {
            dispatch(updateStatus(INITIALIZED));
          }
          else {
            dispatch(updateStatus(MISSING_BLE_PERMISSION));
            return;
          }
        })
        .then(() => {
          dispatch(bleScan())
          subscription.remove();
        })
      }
    }, true);
  };
};
