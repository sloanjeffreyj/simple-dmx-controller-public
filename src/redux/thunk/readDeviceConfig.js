import { SERVICE_UUID, CHARACTERISTIC_INFO_UUID } from '../../constants/microControllerUuid.js';
import { setGroupConfig } from '../actions/setGroupConfig';
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
    for (i = 0; i < MAX_GROUPS; i++) {
      try {
        let dmxControllerResponse = state.bleManager.connectedDevice.readCharacteristicForService(
          SERVICE_UUID,
          CHARACTERISTIC_INFO_UUID
        )
        dmxControllerResponse.then(() => {
          console.log(dmxControllerResponse);
          let responseValue = charBase64.atob(dmxControllerResponse._55.value);
          let rawArray = responseValue.split(',');
          console.log('rawArray: ' + rawArray);
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

          for (i = 0; i < MAX_CHANNELS; i++) {
            newGroup.circuits[i] = Number(rawArray[CHANNEL_START_POSITION + i - 1]);
          }
          dispatch(setGroupConfig(newGroup))
          console.log("Read value from CHARACTERISTIC_INFO_UUID: ", newGroup);
        });
        // return true;
      } catch (error) {
        console.log('readDeviceConfig Error: ', error);
        return false;
      }
    }
  };
};