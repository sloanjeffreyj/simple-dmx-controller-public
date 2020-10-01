import { startBleScan } from './startBleScan.js';
import { clearBleList } from '../actions/bleManagerActions.js';

export const onDeviceDisconnect = (device) => {
  return (dispatch, getState, DeviceManager) => {
    const checkDisconnectSubscription = device.onDisconnected((device) => {
      dispatch(clearBleList());
      dispatch(startBleScan());
      checkDisconnectSubscription.remove();
    });
  }
}