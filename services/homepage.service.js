import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const HomepageService = {
  getHomepageInfo(cardId, token) {
    const config = token
      ? {
          headers: { Authorization: token },
        }
      : {};

    return axios
      .get(`${DOMAIN_URL}/api/homepage/${cardId}`, config)
      .then((response) => response.data);
  },

  updateHomepageTitle(cardId, token, newHomepageTitle) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = {
      homepageTitle: newHomepageTitle,
    };
    return axios
      .put(
        `${DOMAIN_URL}/api/homepage/${cardId}/page-title`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  toggleJobInfoPublic(cardId, token, toggledJobInfo) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = {
      jobInfo: toggledJobInfo,
    };
    return axios
      .patch(
        `${DOMAIN_URL}/api/homepage/${cardId}/job-info/toggle`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  updateLinkInfo(cardId, token, linkId, updateDataObj) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = updateDataObj;
    return axios
      .patch(
        `${DOMAIN_URL}/api/homepage/${cardId}/link/${linkId}`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  deleteLink(cardId, token, linkId) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = {};
    return axios
      .delete(
        `${DOMAIN_URL}/api/homepage/${cardId}/link/${linkId}`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  addNewLink(cardId, token, newDataObj) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = newDataObj;
    return axios
      .post(`${DOMAIN_URL}/api/homepage/${cardId}/link/`, requestBody, config)
      .then((response) => response.data);
  },

  updateLinkOrder(cardId, token, linkId, newIndex) {
    const config = {
      headers: { Authorization: token },
    };
    const requestBody = { newIndex };
    return axios
      .patch(
        `${DOMAIN_URL}/api/homepage/${cardId}/link/${linkId}/order`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  saveBookmark(cardId, token) {
    const config = {
      headers: { Authorization: token },
    };
    return axios
      .post(`${DOMAIN_URL}/api/bookmark-list/cards/${cardId}`, {}, config)
      .then((response) => response.data);
  },

  deleteBookmark(cardId, token) {
    const config = {
      headers: { Authorization: token },
    };
    return axios
      .delete(`${DOMAIN_URL}/api/bookmark-list/cards/${cardId}`, {}, config)
      .then((response) => response.data);
  },
};

export default HomepageService;
