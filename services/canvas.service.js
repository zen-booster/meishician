import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const CanvasService = {
  getCanvasData(cardId) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .get(`${DOMAIN_URL}/api/portfolio/${cardId}/canvas`)
      .then((res) => {
        const { jobInfo, isPublished } = res.data.data;
        const cardInfo = {
          city: jobInfo.city.content,
          companyName: jobInfo.companyName.content,
          domain: jobInfo.domain.content,
          jobTitle: jobInfo.jobTitle.content,
          name: jobInfo.name.content,
          phoneNumber: jobInfo.phoneNumber.content,
          isPublished,
          showInfoForm: false,
        };
        const front = JSON.parse(res.data.data.canvasData.front);
        const back = JSON.parse(res.data.data.canvasData.back);
        return { front, back, cardInfo };
      });
  },
  saveCanvasData(cardId, saveData) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .patch(`${DOMAIN_URL}/api/portfolio/${cardId}/canvas`, saveData)
      .catch(() => alert('存檔出錯'));
  },
  publishCanvas(cardId) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .post(`${DOMAIN_URL}/api/portfolio/${cardId}/publish`)
      .catch(() => alert('發布出錯'));
  },
  changeCardInfo(cardId, jobInfo) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .put(`${DOMAIN_URL}/api/portfolio/${cardId}/job-info`, { jobInfo })
      .catch(() => alert('更改資訊出錯'));
  },
  sendUpdateMessage(cardId, messageBody) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .post(`${DOMAIN_URL}/api/messages/${cardId}`, {
        messageBody,
        category: 'CHANGE',
      })
      .catch(() => alert('傳送訊息出錯'));
  },
};

export default CanvasService;
