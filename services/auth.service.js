import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const AuthService = {
  verify(token) {
    axios.defaults.headers.common.Authorization = token;
    return axios.get(`${DOMAIN_URL}/api/users/check`);
  },
  login(email, password) {
    return axios
      .post(`${DOMAIN_URL}/api/users/login`, { email, password })
      .then((response) => {
        if (response.data.token) {
          return response.data;
        }
        return response.data;
      });
  },
  getAvatar() {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .get(`${DOMAIN_URL}/api/users`)
      .then((res) => res.data.data.user.avatar);
  },
  saveAvatar(imgUrl) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios.patch(`${DOMAIN_URL}/api/users/profile`, { avatar: imgUrl });
  },
};

export default AuthService;
