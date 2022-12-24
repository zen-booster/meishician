import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import historyReducer from './historyReducer';
import objectReducer from './objectReducer';
import loginReducer from './loginReducer';
import loaderReducer from './loaderReducer';
import homepageReducer from './homepageReducer';
import cardInfoReducer from './cardInfoReducer';
import manageReducer from './manageReducer';
import messageReducer from './messageReducer';
import errorReducer from './errorReducer';

const combinedReducer = combineReducers({
  history: historyReducer,
  canvasObject: objectReducer,
  loginStatus: loginReducer,
  loaderStatus: loaderReducer,
  homepage: homepageReducer,
  cardInfo: cardInfoReducer,
  manage: manageReducer,
  messageStatus: messageReducer,
  errorStatus: errorReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.loginStatus) nextState.loginStatus = state.loginStatus;
    // if (state.homepage) nextState.homepage = state.homepage;
    return nextState;
  }
  return combinedReducer(state, action);
};

export default reducer;
