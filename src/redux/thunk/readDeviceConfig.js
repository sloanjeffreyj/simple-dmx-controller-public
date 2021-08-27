import { SERVICE_UUID, CHARACTERISTIC_INFO_UUID } from '../../constants/microControllerUuid.js';
import { setGroupConfig } from '../actions/setGroupConfig.js';
import charBase64 from '../../helpers/charBase64.js';
import { 
  group, 
  GROUP_POSITION, 
  NICKNAME_POSITION,
  INTENSITY_POSITION,
  CHANNEL_START_POSITION,
  MAX_CHANNELS,
  MAX_GROUPS,
  } from '../../constants/groups.js';

export const readDeviceConfig = () => {
  return (dispatch, getState, DeviceManager) => {
    const state = getState();
    for (let i = 0; i < MAX_GROUPS; i++) {
      try {
        let dmxControllerResponse = state.bleManager.connectedDevice.readCharacteristicForService(
          SERVICE_UUID,
          CHARACTERISTIC_INFO_UUID
        )
        dmxControllerResponse.then(() => {
          let responseValue = charBase64.atob(dmxControllerResponse._W.value);
          let rawArray = responseValue.split(',');
          // console.log('rawArray: ' + rawArray);
          // Position subtracted by 1 due to no operation being sent with data.
          let newNickname = '';
          if (rawArray[NICKNAME_POSITION - 1]) {
            newNickname = rawArray[NICKNAME_POSITION - 1];
          }
          
          let newGroup = {
            operation: 0,
            id: rawArray[GROUP_POSITION - 1],
            nickname: newNickname,
            intensity: Number(rawArray[INTENSITY_POSITION - 1]),
            circuits: [],
          };

          let newCircuits = [MAX_CHANNELS];
          for (let j = 0; j < MAX_CHANNELS; j++) {
            newCircuits[j] = Number(rawArray[CHANNEL_START_POSITION + j - 1]);
          };
          newGroup.circuits = newCircuits;
          dispatch(setGroupConfig(newGroup));
          // console.log("Read value from CHARACTERISTIC_INFO_UUID: ", newGroup.circuits);
        });
        // return true;
      } catch (error) {
        console.log('readDeviceConfig Error: ', error);
        return false;
      }
    }
  };
};