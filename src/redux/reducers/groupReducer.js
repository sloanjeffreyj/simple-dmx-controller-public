import initGroupCreation from '../../helpers/initGroupCreation.js';
import {
  SET_INTENSITY,
  SET_NICKNAME,
  SET_CIRCUITS,
  SET_GROUP_CONFIG,
  READ_GROUP_CONFIG,
} from '../../constants/actionTypes.js';

const initialState = {
  groups: initGroupCreation(10),
};

function replaceGroupInfo(state, action) {
  let newState = [];
  state.groups.map((obj) => {
    if (obj.id === action.payload.id) {
      newState = [...newState, action.payload];
    } else {
      newState = [...newState, obj];
    }
  });
  return newState;
}

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTENSITY:
      const newIntensityState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newIntensityState,
      });

    case SET_NICKNAME:
      const newNicknameState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newNicknameState,
      });

    case SET_CIRCUITS:
      const newCircuitsState = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newCircuitsState,
      });

    case SET_GROUP_CONFIG:
      const newGroupConfig = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: newGroupConfig,
      });

    case READ_GROUP_CONFIG:
      const readGroupConfig = replaceGroupInfo(state, action);
      return Object.assign({}, state, {
        groups: readGroupConfig,
      });

    default:
      return state;
  }
}
