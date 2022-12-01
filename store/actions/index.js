import { LOGIN, TOGGLE_LOADER } from '../../constants/constants';
import AuthService from '../../services/auth.services';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  AuthService.login(email, password)
    .then((data) => {
      dispatch({ type: LOGIN });
      console.log(data);
      return Promise.resolve();
    })
    .catch((error) => {
      alert(`帳號密碼錯誤 ${error}`);
    })
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};
