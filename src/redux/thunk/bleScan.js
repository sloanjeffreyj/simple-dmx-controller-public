import { updateStatus, scanConnectBle } from '../actions/bleManagerActions.js';

export const bleScan = () => {
  return (dispatch, getState, DeviceManager) => {
    DeviceManager.startDeviceScan(null, null, (error, device) => {
      dispatch(updateStatus('Scanning'));
      if (error) {
        console.log(error);
      }
      if (device !== null) {
        dispatch(scanConnectBle(device));
      }
    });
  };
};
