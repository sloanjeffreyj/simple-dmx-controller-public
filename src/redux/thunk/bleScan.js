import { updateStatus, scanConnectBle, clearBleList } from '../actions/bleManagerActions.js';
import { SCANNING, MISSING_BLE_PERMISSION } from '../../constants/bleManagerStatus.js';

export const bleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      dispatch(updateStatus(SCANNING));
      if (error) {
        console.log(error);
      }
      if (device !== null) {
        dispatch(scanConnectBle(device));
      }
    });
  };
};
