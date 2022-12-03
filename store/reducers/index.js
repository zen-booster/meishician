import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import historyReducer from './historyReducer';
import objectReducer from './objectReducer';
import loginReducer from './loginReducer';
import loaderReducer from './loaderReducer';
import homepageReducer from './homepageReducer';

const combinedReducer = combineReducers({
  history: historyReducer,
  canvasObject: objectReducer,
  loginStatus: loginReducer,
  loaderStatus: loaderReducer,
  homepage: homepageReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

export default reducer;
