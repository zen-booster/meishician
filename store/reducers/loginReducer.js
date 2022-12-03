import produce from 'immer';
import { LOGIN, LOGOUT, SET_AVATAR } from '../../constants/constants';

const initLoginState = {
  isLogin: false,
  avatar: null,
};

export default function (state = initLoginState, action) {
  switch (action.type) {
    case LOGIN: {
      return produce(state, (draftState) => {
        draftState.isLogin = true;
      });
    }
    case LOGOUT: {
      return produce(state, (draftState) => {
        draftState.isLogin = false;
        draftState.avatar = null;
      });
    }
    case SET_AVATAR: {
      return produce(state, (draftState) => {
        draftState.avatar = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
