import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const MessageService = {
  getAllMessages() {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .get(`${DOMAIN_URL}/api/messages`)
      .then((res) => res.data.data.records);
  },
  setMessageRead(messageId) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios.patch(`${DOMAIN_URL}/api/messages/${messageId}/read`);
  },
};

export default MessageService;
