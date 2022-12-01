import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const AuthService = {
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
};

export default AuthService;
