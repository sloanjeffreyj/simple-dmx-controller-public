import { clearBleList } from '../actions/bleManagerActions.js';

export const disconnectBleDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    if (DeviceManager.isDeviceConnected(device)) {
      DeviceManager.cancelDeviceConnection(device);
      dispatch(clearBleList());
    }
  }
}
