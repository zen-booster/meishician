import {
  SET_HOMEPAGE_INFO,
  TOGGLE_LOADER,
  SET_LINK_EDITOR_DATA,
  SET_LINK_ORDER,
} from '../../constants/constants';

import HomepageService from '../../services/homepage.services';

export const updateHomepageTitle =
  (cardId, token, newHomepageTitle) => (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    HomepageService.updateHomepageTitle(cardId, token, newHomepageTitle)
      .then((data) => {
        const homepageData = data?.data;
        dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
        console.log(data);
      })
      .catch((error) => {
        alert(`錯誤 ${error}`);
      })
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };

export const toggleJobInfoPublic =
  (cardId, token, toggledJobInfo) => (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    HomepageService.toggleJobInfoPublic(cardId, token, toggledJobInfo)
      .then((data) => {
        const homepageData = data?.data;
        dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
      })
      .catch((error) => {
        alert(`錯誤 ${error}`);
      })
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };

export const addNewLink = (cardId, token, newDataObj) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  HomepageService.addNewLink(cardId, token, newDataObj)
    .then((data) => {
      const homepageData = data?.data;
      dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
    })
    .catch((error) => {
      alert(`錯誤 ${error}`);
    })
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const updateLinkInfo =
  (cardId, token, linkId, updateDataObj) => (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    HomepageService.updateLinkInfo(cardId, token, linkId, updateDataObj)
      .then((data) => {
        const homepageData = data?.data;
        dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
      })
      .catch((error) => {
        alert(`錯誤 ${error}`);
      })
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };

export const deleteLink = (cardId, token, linkId) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  HomepageService.deleteLink(cardId, token, linkId)
    .then((data) => {
      const homepageData = data?.data;
      dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
    })
    .catch((error) => {
      alert(`錯誤 ${error}`);
    })
    .finally(() => {
      dispatch({ type: TOGGLE_LOADER });
      dispatch({
        type: SET_LINK_EDITOR_DATA,
        payload: {
          isLinkEditorActive: false,
          isNewLink: false,
          activeLinkId: null,
          activeType: null,
          uploadImgUrl: null,
        },
      });
    });
};

export const setLinkEditorData = (payload) => ({
  type: SET_LINK_EDITOR_DATA,
  payload,
});

export const setLinkOrder = (dragIndex, hoverIndex) => ({
  type: SET_LINK_ORDER,
  payload: { dragIndex, hoverIndex },
});

export const updateLinkOrderApi =
  (cardId, token, linkId, newIndex) => (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    HomepageService.updateLinkOrder(cardId, token, linkId, newIndex)
      .then((data) => {
        const homepageData = data?.data;
        dispatch({ type: SET_HOMEPAGE_INFO, payload: homepageData });
      })
      .catch((error) => {
        alert(`錯誤 ${error}`);
      })
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };
