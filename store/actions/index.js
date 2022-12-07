import {
  LOGIN,
  LOGOUT,
  SET_AVATAR,
  NO_UPDATE,
  TOGGLE_LOADER,
  SET_TOKEN,
  LOGIN_FAILED,
  SET_ACTIVE,
  INITIALIZE,
  NEED_UPDATE,
} from '../../constants/constants';
import AuthService from '../../services/auth.services';
import CanvasService from '../../services/canvas.service';
import getBackground from '../../components/features/Canvas/service/getBackground';
import loadCanvas from '../../components/features/Canvas/service/loadCanvas';
import toImage from '../../components/features/Canvas/service/toImage';
import resizeCanvas from '../../components/features/Canvas/service/resizeCanvas';
import setLoadData from '../../components/features/Canvas/service/setLoadData';

export const verify = () => (dispatch) => {
  const token = localStorage.getItem('auth');
  const avatar = localStorage.getItem('avatar');
  if (token) {
    AuthService.verify(token)
      .then(() => {
        dispatch({ type: LOGIN });
        dispatch({ type: SET_AVATAR, payload: avatar });
        dispatch({ type: SET_TOKEN, payload: token });
      })
      .catch(() => {
        dispatch({ type: LOGOUT });
      });
    dispatch({ type: LOGIN });
  }

  if (!token) {
    dispatch({ type: LOGOUT });
  }
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  AuthService.login(email, password)
    .then((data) => {
      const { token } = data;
      const avatar = data?.data?.user?.avatar;
      dispatch({ type: LOGIN });

      localStorage.setItem('auth', `Bearer ${token}`);
      localStorage.setItem('avatar', avatar);

      dispatch({ type: SET_TOKEN, payload: token });
      dispatch({ type: SET_AVATAR, payload: avatar });
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILED });
    })
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const getAvatar = () => (dispatch) => {
  AuthService.getAvatar()
    .then((avatar) => dispatch({ type: SET_AVATAR, payload: avatar }))
    .catch((err) => {
      alert(`拿取 Avatar失敗`);
      console.log(err);
    });
};

export const fetchCanvas = (cardId, canvasRef, outerRef) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  CanvasService.getCanvasData(cardId)
    .then(({ front, back }) => {
      dispatch({ type: NO_UPDATE });
      const loadData = setLoadData(canvasRef.current, front);
      canvasRef.current.loadFromJSON(loadData, () => {
        dispatch({ type: NEED_UPDATE });
        dispatch({ type: INITIALIZE, payload: { front, back } });
        const background = getBackground(canvasRef.current);
        canvasRef.current.clipPath = background;
        canvasRef.current.renderAll();
        dispatch({ type: SET_ACTIVE, payload: background });
        resizeCanvas(outerRef.current, canvasRef.current);
      });
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

export const newSaveCanvas = (cardId, saveData) => (dispatch) => {
  CanvasService.saveCanvasData(cardId, saveData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const publishCanvas = (cardId, canvasRef, history) => (dispatch) => {
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
    .then(() => {
      CanvasService.publishCanvas(cardId);
    })
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};
