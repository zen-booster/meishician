import produce from 'immer';
import { TOGGLE_ERROR } from '../../constants/constants';

const errorState = {
  isErrorCatch: false,
};

export default function (state = errorState, action) {
  switch (action.type) {
    case TOGGLE_ERROR: {
      return produce(state, (draftState) => {
        draftState.isErrorCatch = !draftState.isErrorCatch;
      });
    }
    default: {
      return state;
    }
  }
}
