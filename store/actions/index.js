import { LOGIN, NO_UPDATE, TOGGLE_LOADER } from '../../constants/constants';
import AuthService from '../../services/auth.services';
import CanvasService from '../../services/canvas.service';
import loadCanvas from '../../components/features/Canvas/service/loadCanvas';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  AuthService.login(email, password)
    .then((data) => {
      dispatch({ type: LOGIN });
      console.log(data);
    })
    .catch((error) => {
      alert(`帳號密碼錯誤 ${error}`);
    })
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const fetchCanvas = (cardId, canvasRef) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  dispatch({ type: NO_UPDATE });
  CanvasService.getCanvas(cardId)
    .then(({ front, back }) => {
      const order = {
        orderName: 'init',
        dispatch,
        payload: { front, back },
      };
      dispatch({ type: NO_UPDATE });
      loadCanvas(canvasRef.current, front, order);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch({ type: TOGGLE_LOADER });
    });
};
