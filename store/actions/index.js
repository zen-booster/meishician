import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { sendToast } from './errorActions';
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
import AuthService from '../../services/auth.service';
import UploadService from '../../services/upload.service';
import CanvasService from '../../services/canvas.service';
import getBackground from '../../components/features/Canvas/service/getBackground';
import resizeCanvas from '../../components/features/Canvas/service/resizeCanvas';
import setLoadData from '../../components/features/Canvas/service/setLoadData';
import { DOMAIN_URL } from '../../configs';

export const signUp = (signUpObj, router) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  axios
    .post(`${DOMAIN_URL}/api/users/sign-up`, signUpObj)
    .then((res) => {
      const apiRes = res.data;
      const { token } = apiRes;
      const avatar = apiRes?.data?.user?.avatar;

      localStorage.setItem('auth', `Bearer ${token}`);
      setCookie('auth', `Bearer ${token}`, {
        expires: new Date(Date.now() + 30 * 86400 * 1000),
      });

      if (avatar) {
        localStorage.setItem('avatar', avatar);
        setCookie('avatar', avatar, {
          expires: new Date(Date.now() + 30 * 86400 * 1000),
        });
      }

      dispatch({ type: SET_TOKEN, payload: `Bearer ${token}` });
      if (avatar) dispatch({ type: SET_AVATAR, payload: avatar });

      localStorage.setItem('auth', `Bearer ${res.data.token}`);
      dispatch({ type: LOGIN });
      router.push('/');
    })
    .catch(() => dispatch(sendToast('註冊失敗')))
    .finally(() => {
      dispatch({ type: TOGGLE_LOADER });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('auth');
  localStorage.removeItem('avatar');
  deleteCookie('auth');
  deleteCookie('avatar');
  dispatch({ type: LOGOUT });
};

export const login = (email, password) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  AuthService.login(email, password)
    .then((data) => {
      const { token } = data;
      const avatar = data?.data?.user?.avatar;
      dispatch({ type: LOGIN });

      localStorage.setItem('auth', `Bearer ${token}`);
      setCookie('auth', `Bearer ${token}`, {
        expires: new Date(Date.now() + 30 * 86400 * 1000),
      });

      if (avatar) localStorage.setItem('avatar', avatar);
      if (avatar)
        setCookie('avatar', avatar, {
          expires: new Date(Date.now() + 30 * 86400 * 1000),
        });

      dispatch({ type: SET_TOKEN, payload: `Bearer ${token}` });
      if (avatar) dispatch({ type: SET_AVATAR, payload: avatar });
    })
    .catch(() => dispatch({ type: LOGIN_FAILED }))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const verify = () => (dispatch, getState) => {
  const token = localStorage.getItem('auth') || getCookie('auth');
  const avatar = localStorage.getItem('avatar') || getCookie('avatar');
  if (token) {
    if (avatar) dispatch({ type: SET_AVATAR, payload: avatar });
    if (!getState().loginStatus.token) {
      dispatch({ type: SET_TOKEN, payload: token });
      dispatch({ type: LOGIN });
    }
    if (!getState().loginStatus.isLogin) {
      dispatch({ type: LOGIN });
    }
  }

  if (!token) {
    dispatch(logout());
  }
};

export const getAvatar = () => (dispatch) => {
  AuthService.getAvatar()
    .then((avatar) => dispatch({ type: SET_AVATAR, payload: avatar }))
    .catch((err) => {
      alert(`拿取 Avatar失敗`);
      console.log(err);
    });
};

export const uploadAvatar = (file, setShowEdit) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  UploadService.uploadImage(file)
    .then((res) => {
      dispatch({ type: SET_AVATAR, payload: res.data.imgUrl });
      localStorage.setItem('avatar', res.data.imgUrl);
      AuthService.saveAvatar(res.data.imgUrl);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      dispatch({ type: TOGGLE_LOADER });
      setShowEdit(false);
    });
};

export const fetchCanvas =
  (cardId, canvasRef, outerRef, setInitFailed) => (dispatch) => {
    dispatch({ type: TOGGLE_LOADER });
    CanvasService.getCanvasData(cardId)
      .then(({ front, back, cardInfo }) => {
        dispatch({ type: SET_CARD_INFO, payload: cardInfo });
        const loadData = setLoadData(canvasRef.current, front);
        return new Promise((resolve) => {
          dispatch({ type: NO_UPDATE });
          canvasRef.current.loadFromJSON(loadData, () => {
            dispatch({ type: NEED_UPDATE });
            dispatch({ type: INITIALIZE, payload: { front, back } });
            const background = getBackground(canvasRef.current);
            canvasRef.current.clipPath = background;
            canvasRef.current.renderAll();
            dispatch({ type: SET_ACTIVE, payload: background });
            resizeCanvas(outerRef.current, canvasRef.current);
            resolve();
          });
        });
      })
      .catch(() => setInitFailed(true))
      .finally(() => dispatch({ type: TOGGLE_LOADER }));
  };

export const saveToStorage = (cardId, saveData) => (dispatch) => {
  CanvasService.saveCanvasData(cardId, saveData)
    .catch((err) => console.log(err))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const publishCanvas = (cardId, saveData, router) => (dispatch) => {
  const saveCanvasData = CanvasService.saveCanvasData(cardId, saveData);
  const setPublished = CanvasService.publishCanvas(cardId);
  axios
    .all([saveCanvasData, setPublished])
    .then(axios.spread(() => router.push('/manage')))
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

export const addCardInfo = (jobInfo, router) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  CanvasService.addCardInfo(jobInfo)
    .then((res) => {
      const { cardId } = res.data.data;
      router.push(`/canvas-editor/${cardId}`);
    })
    .catch(() => dispatch(sendToast('創建資料失敗')))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};
