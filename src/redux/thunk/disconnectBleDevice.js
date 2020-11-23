import { clearBleList } from '../actions/bleManagerActions.js';

export const disconnectBleDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    DeviceManager.cancelDeviceConnection(device);
    dispatch(clearBleList());
  }
}
