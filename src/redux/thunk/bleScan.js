import { updateStatus, scanConnectBle, clearBleList, printConsole } from '../actions/bleManagerActions.js';
import { SCANNING, BLE_ERROR } from '../../constants/bleManagerStatus.js';
import { connectDevice } from '../../redux/thunk/connectDevice.js';

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
      // Automatically connect to hardware with the controllers name.
      if (device.name === 'MVHS DMX') {
        dispatch(connectDevice(device));
      }
    });
  };
};
