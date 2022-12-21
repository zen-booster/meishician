// import produce from 'immer';
import produce from 'immer';
import {
  SET_INIT_DATA,
  OPEN_MODAL,
  TOGGLE_DROPDOWN,
  CLOSE_ALL,
  SET_ACTIVE_SECTION,
  SET_GROUP_ORDER,
  UPDATE_ACTIVE_SECTION,
  SET_BASE_URL,
  UPDATE_MODAL_DATA,
  SET_MANAGE_PAGE,
  RESET_MANAGE,
} from '../../constants/constants';

export const manageModalType = {
  DELETE_PORTFOLIO: 'DELETE_PORTFOLIO',
  SHOW_QRCODE: 'SHOW_QRCODE',
  DELETE_SCRATCH: 'DELETE_SCRATCH',
  EDIT_BOOKMARK: 'EDIT_BOOKMARK',
  DELETE_BOOKMARK: 'DELETE_BOOKMARK',
  ADD_GROUP: 'ADD_GROUP',
  RENAME_GROUP: 'RENAME_GROUP',
  DELETE_GROUP: 'DELETE_GROUP',
  SHOW_CARD: 'SHOW_CARD',
};

export const manageActiveSectionType = {
  PORTFOLIO: 'PORTFOLIO',
  BOOKMARK: 'BOOKMARK',
  SEARCH: 'SEARCH',
  TAG_FILTER: 'TAG_FILTER',
};

export const manageDropdownType = {
  GROUP: 'GROUP',
  BOOKMARK: 'BOOKMARK',
  PORTFOLIO: 'PORTFOLIO',
};

const initState = {
  userId: null,
  groupList: [],
  baseUrl: null,
  defaultGroupId: null,
  activeSection: {
    type: null, // PORTFOLIO  BOOKMARK, SEARCH, TAG_FILTER
    isPublish: true,
    activeGroupId: null,
    activeGroupName: null,
    activeTag: null,
    activesSearchQuery: null,
    sortBy: null,
    mainSectionData: null,
    currentPage: null,
    totalPage: null,
    initDone: false,
  },

  isModalOpen: false,
  isDropdownOpen: false,
  modal: {
    type: null,
    activeBookmarkNote: {
      tags: [],
      note: null,
    },
    activeCardId: null,
    activeGroupId: null,
    activeGroupName: null,

    activeCardImage: null,
    layoutDirection: null,
    activeCompanyName: null,
    activeJobTitle: null,
    activeName: null,
  },
  dropdown: {
    type: null,
    activeGroupId: null,
    activeCardId: null,
  },
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_INIT_DATA:
      return { ...state, ...action.payload };

    case SET_BASE_URL:
      return produce(state, (draftState) => {
        draftState.baseUrl = action.payload;
      });
    case OPEN_MODAL:
      return produce(state, (draftState) => {
        draftState.isModalOpen = true;
        draftState.modal = action.payload;
      });
    case UPDATE_MODAL_DATA:
      return produce(state, (draftState) => {
        Object.assign(draftState.modal, action.payload);
      });
    case TOGGLE_DROPDOWN:
      return produce(state, (draftState) => {
        if (draftState.isDropdownOpen === true) {
          // eslint-disable-next-line no-return-assign
          draftState.dropdown = {
            type: null,
            activeGroupId: null,
            activeCardId: null,
          };
          draftState.isDropdownOpen = false;
        } else {
          draftState.dropdown = action.payload;
          draftState.isDropdownOpen = true;
        }
      });
    case CLOSE_ALL:
      return produce(state, (draftState) => {
        draftState.isModalOpen = false;
        draftState.isDropdownOpen = false;
        draftState.modal = initState.modal;
        draftState.dropdown = initState.dropdown;
      });

    case SET_ACTIVE_SECTION:
      return produce(state, (draftState) => {
        draftState.activeSection = action.payload;
      });
    case UPDATE_ACTIVE_SECTION:
      return produce(state, (draftState) => {
        Object.assign(draftState.activeSection, action.payload);
      });

    case SET_GROUP_ORDER:
      // eslint-disable-next-line consistent-return
      return produce(state, (draftState) => {
        if (!draftState.groupList) return state;
        const { dragIndex, hoverIndex } = action.payload;
        const dragListItem = draftState.groupList[dragIndex];
        draftState.groupList.splice(dragIndex, 1);
        draftState.groupList.splice(hoverIndex, 0, dragListItem);
      });

    case SET_MANAGE_PAGE:
      return produce(state, (draftState) => {
        draftState.activeSection.currentPage = action.payload;
      });

    default:
      return state;
  }
}
