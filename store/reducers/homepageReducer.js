import produce from 'immer';
import {
  LOAD_HOMEPAGE,
  TOGGLE_HOMEPAGE_EDITOR,
  SET_AUTHOR,
} from '../../constants/constants';

const initState = {
  homepageData: null,
  isEditorOpen: false,
  isLoading: false,
  isAuthor: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case LOAD_HOMEPAGE:
      return produce(state, (draftState) => {
        draftState.homepageData = action.payload;
      });
    case SET_AUTHOR:
      return produce(state, (draftState) => {
        draftState.isAuthor = true;
      });
    case TOGGLE_HOMEPAGE_EDITOR:
      return produce(state, (draftState) => {
        draftState.isEditorOpen = !draftState.isEditorOpen;
      });
    default:
      return state;
  }
}
