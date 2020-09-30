import {
  SCAN_CONNECT_BLE,
  CONNECTED_DEVICE,
  UPDATE_STATUS,
} from '../../constants/actionTypes.js';

export const scanConnectBle = (device) => {
  return {
    type: SCAN_CONNECT_BLE,
    device,
  };
};

export const connectedDevice = (device) => {
  return {
    type: CONNECTED_DEVICE,
    connectedDevice: device,
  };
};

export function updateStatus(status) {
  return {
    type: UPDATE_STATUS,
    status: status,
  };
}
