import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const ManageService = {
  getGroupList(token) {
    const config = {
      headers: { Authorization: token },
    };
    console.log('config', config);
    return axios
      .get(`${DOMAIN_URL}/api/bookmark-list/groups`, config)
      .then((response) => response.data);
  },

  getTagList(token) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .get(`${DOMAIN_URL}/api/bookmark-list/tags`, config)
      .then((response) => response.data);
  },

  getBookmarks(token, groupId, page = 1, sortBy = '-isPinned') {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .get(
        `${DOMAIN_URL}/api/bookmark-list/groups/${groupId}/cards?asc=${sortBy}&page=${page}`,
        config
      )
      .then((response) => response.data);
  },

  deleteBookmark(token, cardId) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .delete(`${DOMAIN_URL}/api/bookmark-list/cards/${cardId}`, config)
      .then((response) => response.data);
  },

  deleteGroup(token, groupId) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .delete(`${DOMAIN_URL}/api/bookmark-list/groups/${groupId}`, config)
      .then((response) => response.data);
  },

  addNewGroup(token, groupName) {
    const config = {
      headers: { Authorization: token },
    };

    const requestBody = {
      groupName,
    };

    return axios
      .post(`${DOMAIN_URL}/api/bookmark-list/groups`, requestBody, config)
      .then((response) => response.data);
  },

  editBookmarkNotes(token, cardId, newNotes) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .patch(
        `${DOMAIN_URL}/api/bookmark-list/cards/${cardId}/notes`,
        newNotes,
        config
      )
      .then((response) => response.data);
  },

  getTagBookmarks(token, tag) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .get(`${DOMAIN_URL}/api/bookmark-list/tags/${tag}`, config)
      .then((response) => response.data);
  },

  renameGroup(token, groupId, newGroupName) {
    const config = {
      headers: { Authorization: token },
    };

    const requestBody = {
      newGroupName,
    };

    return axios
      .patch(
        `${DOMAIN_URL}/api/bookmark-list/groups/${groupId}`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  updateGroupOrder(token, groupId, newIndex) {
    const config = {
      headers: { Authorization: token },
    };

    const requestBody = {
      newIndex,
    };

    return axios
      .patch(
        `${DOMAIN_URL}/api/bookmark-list/groups/${groupId}/order`,
        requestBody,
        config
      )
      .then((response) => response.data);
  },

  toggleCardPin(token, cardId, pin = true) {
    return axios({
      headers: { Authorization: token },
      method: pin ? 'post' : 'delete',
      url: `${DOMAIN_URL}/api/bookmark-list/cards/${cardId}/pin`,
      'Content-Type': 'application/json',
    }).then((response) => response.data);
  },

  getPortfolio(token) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .get(`${DOMAIN_URL}/api/portfolio`, config)
      .then((response) => response.data);
  },

  sendDeleteMessage(token, cardId, messageBody) {
    const config = {
      headers: { Authorization: token },
    };

    const requestBody = {
      messageBody,
      category: 'DELETE',
    };

    return axios
      .post(`${DOMAIN_URL}/api/messages/${cardId}`, requestBody, config)
      .then((response) => response.data);
  },

  deletePortfolio(token, cardId) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .delete(`${DOMAIN_URL}/api/portfolio/${cardId}`, config)
      .then((response) => response.data);
  },

  getPortfolioCard(token, cardId) {
    const config = {
      headers: { Authorization: token },
    };

    return axios
      .get(`${DOMAIN_URL}/api/portfolio/${cardId}`, config)
      .then((response) => response.data);
  },
};

export default ManageService;
