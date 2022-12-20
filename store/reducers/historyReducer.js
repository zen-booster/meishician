import produce from 'immer';
import {
  INITIALIZE,
  UPDATE,
  UNDO,
  REDO,
  NO_UPDATE,
  NEED_UPDATE,
  FLIP,
  ROTATE,
} from '../../constants/constants';
import {
  horizonCard,
  verticalCard,
} from '../../components/features/Canvas/config/defaultCard';

const historyState = {
  state: { front: null, back: null, position: 'front' },
  undoBox: [],
  redoBox: [],
  needUpdate: true,
};

export default function (state = historyState, action) {
  switch (action.type) {
    case INITIALIZE: {
      const newState = produce(state, (draftState) => {
        draftState.state.front = action.payload.front;
        draftState.state.back = action.payload.back;
        draftState.state.position = 'front';
      });
      return newState;
    }
    case UPDATE: {
      if (state.needUpdate === false) return state;

      switch (state.state.position) {
        case 'front':
          return produce(state, (draftState) => {
            if (draftState.undoBox.length > 50) draftState.undoBox.shift();
            draftState.undoBox.push(state.state);
            draftState.state.front = action.payload.newState;
            draftState.redoBox = [];
          });
        case 'back':
          return produce(state, (draftState) => {
            draftState.undoBox.push(state.state);
            draftState.state.back = action.payload.newState;
            draftState.redoBox = [];
          });
        default: {
          return state;
        }
      }
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
    case FLIP: {
      switch (state.state.position) {
        case 'front':
          return produce(state, (draftState) => {
            draftState.state.position = 'back';
          });
        case 'back':
          return produce(state, (draftState) => {
            draftState.state.position = 'front';
          });
        default:
          return state;
      }
    }
    case ROTATE: {
      const { width, height } = state.state.front.objects[0];
      const size = width > height ? 'horizon' : 'vertical';

      switch (size) {
        case 'horizon':
          return produce(state, (draftState) => {
            draftState.state.front = verticalCard.front;
            draftState.state.back = verticalCard.back;
          });
        case 'vertical':
          return produce(state, (draftState) => {
            draftState.state.front = horizonCard.front;
            draftState.state.back = horizonCard.back;
          });
        default:
          return state;
      }
    }
    default: {
      return state;
    }
  }
}
