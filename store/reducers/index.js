import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import objectReducer from './objectReducer';

export default combineReducers({
  history: historyReducer,
  canvasObject: objectReducer,
});
