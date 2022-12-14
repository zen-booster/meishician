import produce from 'immer';
import {
  SET_HOMEPAGE_INFO,
  TOGGLE_HOMEPAGE_EDITOR,
  SET_AUTHOR,
  REMOVE_AUTHOR,
  SET_LINK_EDITOR_DATA,
  SET_LINK_ORDER,
} from '../../constants/constants';

const initState = {
  homepageData: null,
  isEditorOpen: false,
  isAuthor: false,
  linkEditor: {
    isLinkEditorActive: false,
    isNewLink: false,
    activeLinkId: null,
    activeType: null,
    uploadImgUrl: null,
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_HOMEPAGE_INFO:
      return produce(state, (draftState) => {
        draftState.homepageData = {
          ...draftState.homepageData,
          ...action.payload,
        };
      });
    case SET_AUTHOR:
      return produce(state, (draftState) => {
        draftState.isAuthor = true;
      });
    case REMOVE_AUTHOR:
      return produce(state, (draftState) => {
        draftState.isAuthor = false;
      });
    case TOGGLE_HOMEPAGE_EDITOR:
      return produce(state, (draftState) => {
        draftState.isEditorOpen = !draftState.isEditorOpen;
      });

    case SET_LINK_EDITOR_DATA:
      return produce(state, (draftState) => {
        draftState.linkEditor = { ...draftState.linkEditor, ...action.payload };
      });
    case SET_LINK_ORDER:
      // eslint-disable-next-line consistent-return
      return produce(state, (draftState) => {
        if (!draftState.homepageData.homepageLink) return state;
        const { dragIndex, hoverIndex } = action.payload;
        const dragListItem = draftState.homepageData.homepageLink[dragIndex];
        draftState.homepageData.homepageLink.splice(dragIndex, 1);

        draftState.homepageData.homepageLink.splice(
          hoverIndex,
          0,
          dragListItem
        );
      });
    default:
      return state;
  }
}
