import produce from 'immer';
import { SET_MESSAGES, SET_MESSAGE_READ } from '../../constants/constants';

const messageStatus = {
  messages: [],
};

export default function (state = messageStatus, action) {
  switch (action.type) {
    case SET_MESSAGES: {
      return produce(state, (draftState) => {
        draftState.messages = action.payload;
      });
    }
    case SET_MESSAGE_READ: {
      const { messageIndex } = action.payload;
      return produce(state, (draftState) => {
        draftState.messages[messageIndex].isRead = true;
      });
    }
    default: {
      return state;
    }
  }
}
