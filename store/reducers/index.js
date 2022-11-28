import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import objectReducer from './objectReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  history: historyReducer,
  canvasObject: objectReducer,
  loginStatus: loginReducer,
});
