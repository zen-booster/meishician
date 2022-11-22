import produce from 'immer';
import {
  INITIALIZE,
  UPDATE,
  UNDO,
  REDO,
  NO_UPDATE,
  NEED_UPDATE,
} from '../../constants/constants';

const historyState = {
  state: '',
  undoBox: [],
  redoBox: [],
  needUpdate: true,
};

export default function (state = historyState, action) {
  switch (action.type) {
    case INITIALIZE: {
      const newState = produce(state, (draftState) => {
        draftState.state = action.payload.initState;
      });
      return newState;
    }
    case UPDATE: {
      if (state.needUpdate === false) {
        return state;
      }

      const newState = produce(state, (draftState) => {
        draftState.undoBox.push(state.state);
        draftState.state = action.payload.newState;
        draftState.redoBox = [];
      });
      return newState;
    }
    case UNDO: {
      const newState = produce(state, (draftState) => {
        const prevData = draftState.undoBox.pop();
        draftState.redoBox.push(draftState.state);
        draftState.state = prevData;
      });
      return newState;
    }
    case REDO: {
      const newState = produce(state, (draftState) => {
        const lastData = draftState.redoBox.pop();
        draftState.undoBox.push(draftState.state);
        draftState.state = lastData;
      });
      return newState;
    }
    case NO_UPDATE: {
      return produce(state, (draftState) => {
        draftState.needUpdate = false;
      });
    }
    case NEED_UPDATE: {
      return produce(state, (draftState) => {
        draftState.needUpdate = true;
      });
    }
    default: {
      return state;
    }
  }
}
