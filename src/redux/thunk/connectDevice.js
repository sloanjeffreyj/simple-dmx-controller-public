import { onDeviceDisconnect } from './onDeviceDisconnect.js';
import { startBleScan } from './startBleScan.js';
import { readDeviceConfig } from './readDeviceConfig.js';
import { updateStatus, connectedDevice, clearBleList } from '../actions/bleManagerActions.js';
import { CONNECTING, DISCOVERING, SETTING_NOTIFICATIONS, LISTENING, SCANNING, LOADING } from '../../constants/bleManagerStatus.js';

export const connectDevice = (device) => {
  return (dispatch, getState, DeviceManager) => {
    dispatch(updateStatus(CONNECTING));
    DeviceManager.stopDeviceScan();
    device
      .connect()
      .then((device) => {
        dispatch(updateStatus(DISCOVERING));
        let characteristics = device.discoverAllServicesAndCharacteristics();
        return characteristics;
      })
      .then((device) => {
        dispatch(updateStatus(SETTING_NOTIFICATIONS));
        return device;
      })
      .then(
        (device) => {
          dispatch(updateStatus(LOADING));
          dispatch(connectedDevice(device));
          dispatch(readDeviceConfig());
          dispatch(onDeviceDisconnect(device));
          return device;
        },
        (error) => {
          console.log(error);
          dispatch(updateStatus(SCANNING));
          dispatch(clearBleList());
          dispatch(startBleScan());
        }
      );
  };
};
