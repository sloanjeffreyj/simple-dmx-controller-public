import { BleManager } from 'react-native-ble-plx';

import {
  SCAN_CONNECT_BLE,
  CONNECTED_DEVICE,
  UPDATE_STATUS,
  CLEAR_BLE_LIST
} from '../../constants/actionTypes.js';
import { CONNECTED } from '../../constants/bleManagerStatus.js';
import { requestBlePermission } from '../../helpers/requestBlePermission.js';

const initialState = {
  bleList: [],
  connectedDevice: {},
  status: 'disconnected',
};

// export async function scanAndConnectBle(state) {
//   console.log('Running scanAndConnectBle...');
//   await requestBlePermission();
//   console.log('State before scanAndConnectBle:');
//   console.log(state);
//   if (state.device) {
//     return state;
//   }
//   primaryBleManager.startDeviceScan(null, null, (error, device) => {
//     if (state.device) {
//       return state;
//     }
//     console.log('Attempting to connect...');

//     console.log('Device name: ' + device.name);

//     if (device.name === 'MVHS DMX') {
//       console.log('Found Bluetooth device to connect to.');
//       device.connect().then((device) => {
//         console.log('Is device connected:');
//         console.log(primaryBleManager.isDeviceConnected(device.id));
//         console.log('Connected to device.');
//         // console.log('Device:');
//         // console.log(device);
//         primaryBleManager.stopDeviceScan();
//         const newState = {
//           device: device.id,
//           loading: false,
//           errorMessage: 'stuff',
//         };
//         console.log('Device ID:');
//         console.log(device.id);
//         if (!device.id) {
//           return state;
//         }
//         bleManagerReducer(
//           state,
//           (action = { type: SCAN_CONNECT_BLE_FULFILLED, payload: newState })
//         );
//       });
//     }

//     // Continuously scan until connected
//     if (error) {
//       console.log(error);
//       console.log('Switch: error, unable to connect');
//     }
//   });
//   console.log('Returning regular state...');
//   return state;
// }

export default function bleManagerReducer(state = initialState, action) {
  console.log('Inside bleManagerReducer, action.type:');
  console.log(action.type);

  switch (action.type) {
    case SCAN_CONNECT_BLE:
      console.log('Running SCAN_CONNECT_BLE...');
      if (
        state.bleList.some((device) => device.id === action.device.id) ||
        action.device.name === null) {
        console.log('Not updating state.');
        return state;
      }
      else {
        const newBle = [...state.bleList, action.device];
        console.log('Updating SCAN_CONNECT_BLE');
        return {
          bleList: newBle,
          connectedDevice: state.connectedDevice,
          status: action.status,
        };
      }

    case CONNECTED_DEVICE:
      console.log('Reducer connected device', action);
      return {
        bleList: state.bleList,
        connectedDevice: action.connectedDevice,
        status: CONNECTED,
      };

    case UPDATE_STATUS:
      if (state.status === action.status) {
        return state;
      }
      console.log('Change status:', action.status);
      return {
        bleList: state.bleList,
        connectedDevice: action.connectedDevice,
        status: action.status,
      };

    case CLEAR_BLE_LIST:
      return {
        bleList: [],
        connectedDevice: {},
        status: state.status
      }

    default:
      return state;
  }
}
