import charBase64 from '../../helpers/charBase64.js';
import { updateStatus } from '../actions/bleManagerActions.js';
import { setGroupIntensity } from '../actions/setGroupIntensity.js';

export const updateIntensity = (groupInfo) => {
  console.log('groupInfo:');
  console.log(groupInfo);
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    const groupInfoBase64 = charBase64.btoa(
      groupInfo.intensity.toString() + ',' + groupInfo.circuits.toString()
    );
    console.log('Intensity:');
    console.log(groupInfoBase64);
    try {
      let dmxControllerResponse = state.bleManager.connectedDevice.writeCharacteristicWithResponseForService(
        '4fafc201-1fb5-459e-8fcc-c5c9c331914b',
        'beb5483e-36e1-4688-b7f5-ea07361b26a8',
        groupInfoBase64
      );
      dispatch(setGroupIntensity(groupInfo));
      return true;
    } catch (error) {
      console.log('Update Error: ', error);
      return false;
    }
  };
};
