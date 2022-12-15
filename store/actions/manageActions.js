import {
  TOGGLE_LOADER,
  SET_INIT_DATA,
  OPEN_MODAL,
  TOGGLE_DROPDOWN,
  CLOSE_ALL,
  SET_ACTIVE_SECTION,
  SET_GROUP_ORDER,
  UPDATE_ACTIVE_SECTION,
  SET_BASE_URL,
  UPDATE_MODAL_DATA,
} from '../../constants/constants';

import ManageService from '../../services/manage.service';
import {
  manageModalType,
  manageActiveSectionType,
  // manageDropdownType,
} from '../reducers/manageReducer';

export const setInitData =
  (token, groupId, page, sortBy) => async (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    dispatch({ type: CLOSE_ALL });
    page = page ?? 1;
    sortBy = sortBy ?? '-isPinned';

    let initObj = {};
    try {
      let apiRes;
      apiRes = await ManageService.getGroupList(token);
      const groupList = apiRes?.data?.records || [];

      apiRes = await ManageService.getTagList(token);
      const tags = apiRes?.data?.records || [];

      const defaultGroupId = groupList.filter(
        (el) => el.isDefaultGroup === true
      )[0]._id;

      const activeGroupId = groupId ?? defaultGroupId;
      const activeGroupName =
        groupList.filter((group) => group._id === activeGroupId)[0].name ??
        '預設';

      apiRes = await ManageService.getBookmarks(
        token,
        activeGroupId,
        page,
        sortBy
      );

      const { totalPage, currentPage, records: mainSectionData } = apiRes.data;

      initObj = {
        ...initObj,
        groupList,
        defaultGroupId,
        tags,

        activeSection: {
          type: manageActiveSectionType.BOOKMARK,
          activeGroupId,
          activeGroupName,
          mainSectionData,
          totalPage,
          currentPage,
          sortBy,
        },
      };
      dispatch({ type: SET_INIT_DATA, payload: initObj });
      dispatch({ type: TOGGLE_LOADER });
    } catch (err) {
      console.log(err);
      dispatch({ type: TOGGLE_LOADER });
    }
  };

export const setBaseUrl = (url) => ({ type: SET_BASE_URL, payload: url });

export const setGroupListActive =
  (token, groupId) => async (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER });
    dispatch({ type: CLOSE_ALL });

    try {
      let { sortBy } = getState().manage.activeSection;
      sortBy = sortBy ?? '-isPinned';
      const apiRes = await ManageService.getBookmarks(
        token,
        groupId,
        1,
        sortBy
      );
      const { groupList } = getState().manage;
      const activeGroupName = groupList.filter(
        (group) => group._id === groupId
      )[0].name;
      const mainSectionData = apiRes?.data?.records ?? [];
      dispatch({
        type: SET_ACTIVE_SECTION,
        payload: {
          type: manageActiveSectionType.BOOKMARK,
          activeGroupId: groupId,
          activeGroupName,
          mainSectionData,
          sortBy,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: TOGGLE_LOADER });
    }
  };

export const toggleDropdown = (payload) => {
  const { type, activeGroupId, activeCardId } = payload;
  return {
    type: TOGGLE_DROPDOWN,
    payload: {
      type,
      activeGroupId,
      activeCardId,
    },
  };
};

export const closeAll = () => ({
  type: CLOSE_ALL,
});

export const openModal = (payload) => (dispatch) => {
  dispatch({ type: CLOSE_ALL });
  dispatch({ type: OPEN_MODAL, payload });
};

export const editBookmarkNotes =
  (token, cardId, newNotes) => async (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    try {
      // eslint-disable-next-line no-unused-vars
      const apiRes = await ManageService.editBookmarkNotes(
        token,
        cardId,
        newNotes
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: TOGGLE_LOADER });
      dispatch({ type: CLOSE_ALL });
    }
  };

export const deleteBookmark = (token, cardId) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  try {
    // eslint-disable-next-line no-unused-vars
    const apiRes = await ManageService.deleteBookmark(token, cardId);
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
    dispatch({ type: CLOSE_ALL });
  }
};

export const addNewGroup = (token, groupName) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  try {
    const apiRes = await ManageService.addNewGroup(token, groupName);
    const groupList = apiRes.data.records;
    dispatch({ type: SET_INIT_DATA, payload: { groupList } });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
    dispatch({ type: CLOSE_ALL });
  }
};

export const renameGroup =
  (token, groupId, groupName) => async (dispatch, getState) => {
    dispatch({ type: TOGGLE_LOADER });
    try {
      const apiRes = await ManageService.renameGroup(token, groupId, groupName);
      const { activeGroupId } = getState().manage.activeSection;
      const groupList = apiRes.data.records;

      if (groupId === activeGroupId) {
        const activeGroupName = groupList.filter(
          (group) => group._id === activeGroupId
        )[0].name;
        dispatch({
          type: UPDATE_ACTIVE_SECTION,
          payload: {
            activeGroupName,
          },
        });
      }
      dispatch({ type: SET_INIT_DATA, payload: { groupList } });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: TOGGLE_LOADER });
      dispatch({ type: CLOSE_ALL });
    }
  };

export const deleteGroup = (token, groupId) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  try {
    // eslint-disable-next-line no-unused-vars
    const apiRes = await ManageService.deleteGroup(token, groupId);
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
    dispatch({ type: CLOSE_ALL });
  }
};

export const toggleCardPin =
  (token, cardId, pin = true) =>
  async (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    try {
      // eslint-disable-next-line no-unused-vars
      const apiRes = await ManageService.toggleCardPin(token, cardId, pin);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: TOGGLE_LOADER });
    }
  };

export const getTagBookmarks = (token, tag) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  try {
    const apiRes = await ManageService.getTagBookmarks(token, tag);
    const mainSectionData = apiRes?.data.records ?? [];
    const { currentPage, totalPage } = apiRes.data;

    const activeSection = {
      type: manageActiveSectionType.TAG_FILTER,
      activeGroupId: null,
      activeGroupName: null,
      activeTag: tag,
      mainSectionData,
      currentPage,
      totalPage,
    };
    dispatch({ type: SET_INIT_DATA, payload: { activeSection } });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
  }
};

export const setGroupOrder = (dragIndex, hoverIndex) => ({
  type: SET_GROUP_ORDER,
  payload: { dragIndex, hoverIndex },
});

export const updateGroupOrderApi = (token, groupId, newIndex) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  ManageService.updateGroupOrder(token, groupId, newIndex)
    .then((data) => {
      const groupList = data?.data?.records ?? [];
      console.log(groupList);
      return groupList;
    })
    .then((groupList) => {
      dispatch({ type: SET_INIT_DATA, payload: { groupList } });
      dispatch({ type: TOGGLE_LOADER });
    })
    .catch((error) => {
      alert(`錯誤 ${error}`);
      dispatch({ type: TOGGLE_LOADER });
    });
};

export const setBookmarkGroup = (token, groupId, cardId) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  console.log('trigger');
  ManageService.editBookmarkNotes(token, cardId, { followerGroupId: groupId })
    .then(() => {
      console.log(groupId);
      dispatch(setInitData(token, groupId));
      dispatch({ type: TOGGLE_LOADER });
    })

    .catch((error) => {
      alert(`錯誤 ${error}`);
      dispatch({ type: TOGGLE_LOADER });
    });
};

export const setPortfolioActive = (token) => async (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  dispatch({ type: CLOSE_ALL });

  try {
    const apiRes = await ManageService.getPortfolio(token);
    const mainSectionData = apiRes?.data?.records ?? [];
    dispatch({
      type: SET_ACTIVE_SECTION,
      payload: {
        type: manageActiveSectionType.PORTFOLIO,
        activeGroupId: null,
        activeGroupName: null,
        isPublish: true,
        mainSectionData,
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
  }
};

export const setPortfolioCarImage = (token, cardId) => async (dispatch) => {};

export const openShowCardModal = (token, cardId) => async (dispatch) => {
  dispatch({ type: CLOSE_ALL });
  dispatch({ type: TOGGLE_LOADER });
  try {
    const apiRes = await ManageService.getPortfolioCard(token, cardId);
    const cardImage = apiRes?.data?.cardImageData;
    const layoutDirection = apiRes?.data?.layoutDirection;
    console.log(layoutDirection);
    if (cardImage) {
      dispatch({
        type: OPEN_MODAL,
        payload: {
          type: manageModalType.SHOW_CARD,
          activeCardId: cardId,
        },
      });
      dispatch({
        type: UPDATE_MODAL_DATA,
        payload: { activeCardImage: cardImage, layoutDirection },
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    dispatch({ type: TOGGLE_LOADER });
  }
};
