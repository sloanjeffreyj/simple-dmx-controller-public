import {SERVICE_UUID, CHARACTERISTIC_INFO_UUID} from '../../constants/microControllerUuid.js';
import getDeviceConfig from '../actions/getDeviceConfig.js';
import charBase64 from '../../helpers/charBase64.js';

export const readDeviceConfig = () => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    try {
      let dmxControllerResponse = state.bleManager.connectedDevice.readCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_INFO_UUID
      )
      dmxControllerResponse.then(() => {
        console.log("Read value from CHARACTERISTIC_INFO_UUID: ");
        let printValue = charBase64.atob(dmxControllerResponse._55.value);
        console.log(printValue);
      });
      return true;
    } catch (error) {
      console.log('Update Error: ', error);
      return false;
    }
  };
};