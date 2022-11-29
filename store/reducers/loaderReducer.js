import produce from 'immer';
import { TOGGLE_LOADER } from '../../constants/constants';

const loaderState = {
  isLoading: false,
};

export default function (state = loaderState, action) {
  switch (action.type) {
    case TOGGLE_LOADER: {
      return produce(state, (draftState) => {
        draftState.isLoading = !state.isLoading;
      });
    }
    default: {
      return state;
    }
  }
}
