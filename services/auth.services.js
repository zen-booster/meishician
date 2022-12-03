import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const AuthService = {
  verify() {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios.get(`${DOMAIN_URL}/api/users/check`);
  },
  login(email, password) {
    return axios
      .post(`${DOMAIN_URL}/api/users/login`, { email, password })
      .then((response) => {
        if (response.data.token) {
          const { token, user } = (({ token, user }) => ({ token, user }))(
            response.data
          );
          localStorage.setItem('auth', `Bearer ${token}`);
          return user;
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
};

export default AuthService;
