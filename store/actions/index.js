import { LOGIN, NO_UPDATE, TOGGLE_LOADER } from '../../constants/constants';
import AuthService from '../../services/auth.services';
import CanvasService from '../../services/canvas.service';
import getBackground from '../../components/features/Canvas/service/getBackground';
import loadCanvas from '../../components/features/Canvas/service/loadCanvas';
import toImage from '../../components/features/Canvas/service/toImage';

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
  CanvasService.getCanvasData(cardId)
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

export const saveCanvas = (cardId, canvasRef, history) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  const { front, back, position } = history.state;
  const background = getBackground(canvasRef.current);

  const canvasData = {
    front: JSON.stringify(front),
    back: JSON.stringify(back),
  };

  // get image of two side and get back where you were
  dispatch({ type: NO_UPDATE });
  const order = { orderName: null, dispatch };
  loadCanvas(canvasRef.current, front, order);
  const frontImage = toImage(canvasRef.current, background);
  loadCanvas(canvasRef.current, back, order);
  const backImage = toImage(canvasRef.current, background);
  order.orderName = 'load';
  if (position === 'front') loadCanvas(canvasRef.current, front, order);
  if (position === 'back') loadCanvas(canvasRef.current, back, order);

  const layoutDirection =
    background.width > background.height ? 'horizontal' : 'vertical';

  const saveData = {
    canvasData,
    layoutDirection,
    cardImageData: { front: frontImage, back: backImage },
  };

  CanvasService.saveCanvasData(cardId, saveData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};
