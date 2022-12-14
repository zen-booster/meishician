import produce from 'immer';
import {
  SET_CARD_INFO,
  SHOW_INFO_FROM,
  HIDE_INFO_FROM,
} from '../../constants/constants';

const cardInfo = {
  city: '',
  companyName: '',
  domain: '',
  jobTitle: '',
  name: '',
  phoneNumber: '',
  isPublished: '',
  showInfoForm: false,
};

export default function (state = cardInfo, action) {
  switch (action.type) {
    case SET_CARD_INFO: {
      return action.payload;
    }
    case SHOW_INFO_FROM: {
      return produce(state, (draftState) => {
        draftState.showInfoForm = true;
      });
    }
    case HIDE_INFO_FROM: {
      return produce(state, (draftState) => {
        draftState.showInfoForm = false;
      });
    }
    default: {
      return state;
    }
  }
}
