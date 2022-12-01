import produce from 'immer';
import { LOGIN, LOGOUT } from '../../constants/constants';

const initLoginState = {
  isLogin: false,
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
      });
    }
    default: {
      return state;
    }
  }
}
