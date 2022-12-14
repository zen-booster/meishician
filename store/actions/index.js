import axios from 'axios';
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
  SET_CARD_INFO,
} from '../../constants/constants';
import AuthService from '../../services/auth.services';
import CanvasService from '../../services/canvas.service';
import getBackground from '../../components/features/Canvas/service/getBackground';
import resizeCanvas from '../../components/features/Canvas/service/resizeCanvas';
import setLoadData from '../../components/features/Canvas/service/setLoadData';

export const verify = () => (dispatch) => {
  const token = localStorage.getItem('auth');
  const avatar = localStorage.getItem('avatar');
  if (token) {
    AuthService.verify(token)
      .then(() => {
        dispatch({ type: LOGIN });
        if (avatar) dispatch({ type: SET_AVATAR, payload: avatar });
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
      if (avatar) localStorage.setItem('avatar', avatar);

      dispatch({ type: SET_TOKEN, payload: token });
      if (avatar) dispatch({ type: SET_AVATAR, payload: avatar });
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
    .then(({ front, back, cardInfo }) => {
      dispatch({ type: SET_CARD_INFO, payload: cardInfo });
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

export const saveToStorage = (cardId, saveData) => (dispatch) => {
  CanvasService.saveCanvasData(cardId, saveData)
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const publishCanvas = (cardId) => (dispatch) => {
  CanvasService.publishCanvas(cardId)
    .then(() => dispatch({ type: TOGGLE_LOADER }))
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const updateCard =
  (cardId, jobInfo, messageBody, saveData, router) => async (dispatch) => {
    const changeInfo = CanvasService.changeCardInfo(cardId, jobInfo);
    const sendMessage = CanvasService.sendUpdateMessage(cardId, messageBody);
    const saveCanvasData = CanvasService.saveCanvasData(cardId, saveData);
    axios
      .all([changeInfo, sendMessage, saveCanvasData])
      .then(axios.spread(() => router.push('/card-wall')))
      .catch((err) => console.log(err))
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };
