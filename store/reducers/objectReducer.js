import produce from 'immer';
import { SET_ACTIVE } from '../../constants/constants';

const objectState = {
  activeObject: null,
};

export default function (state = objectState, action) {
  switch (action.type) {
    case SET_ACTIVE: {
      return produce(state, (draftState) => {
        draftState.activeObject = action.payload;
      });
    }
    default: {
      return state;
    }
  }
}
