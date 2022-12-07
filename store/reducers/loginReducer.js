import produce from 'immer';
import {
  LOGIN,
  LOGOUT,
  SET_AVATAR,
  SET_TOKEN,
  LOGIN_FAILED,
} from '../../constants/constants';

const initLoginState = {
  isLogin: null,
  avatar: null,
  isLoginFailed: false,
  token: null,
};

export default function (state = initLoginState, action) {
  switch (action.type) {
    case LOGIN: {
      return produce(state, (draftState) => {
        draftState.isLogin = true;
        draftState.isLoginFailed = false;
      });
    }

    case LOGIN_FAILED: {
      return produce(state, (draftState) => {
        draftState.isLogin = false;
        draftState.isLoginFailed = true;
        draftState.token = null;
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

    case SET_TOKEN: {
      return produce(state, (draftState) => {
        draftState.token = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
