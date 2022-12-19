import {
  SET_MESSAGES,
  SET_MESSAGE_READ,
  TOGGLE_LOADER,
} from '../../constants/constants';
import MessageService from '../../services/message.service';

export const getAllMessages = () => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  MessageService.getAllMessages()
    .then((messages) => dispatch({ type: SET_MESSAGES, payload: messages }))
    .catch((err) => alert(`錯誤 ${err}`))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};

export const setMessageRead = (messageId, messageIndex) => (dispatch) => {
  dispatch({ type: TOGGLE_LOADER });
  MessageService.setMessageRead(messageId)
    .then(() => dispatch({ type: SET_MESSAGE_READ, payload: { messageIndex } }))
    .catch((err) => alert(`錯誤 ${err}`))
    .finally(() => dispatch({ type: TOGGLE_LOADER }));
};
