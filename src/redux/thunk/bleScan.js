import { updateStatus, scanConnectBle, clearBleList, printConsole } from '../actions/bleManagerActions.js';
import { SCANNING, BLE_ERROR } from '../../constants/bleManagerStatus.js';
import { connectDevice } from '../../redux/thunk/connectDevice.js';

export const bleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    // If scan already happens to be in progress, stop it before starting it again.
    DeviceManager.stopDeviceScan();
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
      // Automatically connect to hardware with the controllers name. Also checks if device has name.
      if (device.name && device.name === 'MVHS DMX') {
        dispatch(connectDevice(device));
      };
    });
  };
};
