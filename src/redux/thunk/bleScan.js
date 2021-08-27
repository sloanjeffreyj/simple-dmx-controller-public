import { updateStatus, scanConnectBle, clearBleList, printConsole } from '../actions/bleManagerActions.js';
import { SCANNING, BLE_ERROR } from '../../constants/bleManagerStatus.js';

export const bleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        dispatch(updateStatus(BLE_ERROR));
        dispatch(printConsole(error.message));
        console.log(error);
      }
      if (device !== null) {
        dispatch(updateStatus(SCANNING));
        dispatch(scanConnectBle(device));
      }
    });
  };
};
