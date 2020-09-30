import { updateStatus, connectedDevice } from '../actions/bleManagerActions.js';

export const connectDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(updateStatus('Connecting'));
    DeviceManager.stopDeviceScan();
    device
      .connect()
      .then((device) => {
        dispatch(updateStatus('Discovering'));
        let characteristics = device.discoverAllServicesAndCharacteristics();
        return characteristics;
      })
      .then((device) => {
        dispatch(updateStatus('Setting Notifications'));
        return device;
      })
      .then(
        (device) => {
          dispatch(updateStatus('Listening'));
          dispatch(connectedDevice(device));
          return device;
        },
        (error) => {
          console.log(this._logError('SCAN', error));
        }
      );
  };
};
