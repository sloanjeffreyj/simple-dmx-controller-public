import { SET_INTENSITY } from '../../constants/actionTypes.js';

export default function setGroupIntensity(payload) {
  return {
    type: SET_INTENSITY,
    payload: payload,
  };
}
