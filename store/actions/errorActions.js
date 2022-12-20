import { ToastifyService } from '../../services/toastify.service';
import { TOGGLE_ERROR } from '../../constants/constants';

export const sendToast = (text) => (dispatch) => {
  dispatch({ type: TOGGLE_ERROR });
  ToastifyService.sendToast(text);
  dispatch({ type: TOGGLE_ERROR });
};
