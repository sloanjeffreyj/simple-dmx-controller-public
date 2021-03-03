import { READ_CONFIG } from '../../constants/actionTypes.js';

export default function setGroupCircuits(payload) {
  return {
    type: READ_CONFIG,
    payload: payload,
  };
}