import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const CanvasService = {
  getCanvasData(cardId) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .get(`${DOMAIN_URL}/api/portfolio/${cardId}/canvas`)
      .then((res) => {
        const front = JSON.parse(res.data.data.canvasData.front);
        const back = JSON.parse(res.data.data.canvasData.back);
        return { front, back };
      })
      .catch(() => alert('初始化出錯'));
  },
  saveCanvasData(cardId, saveData) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .patch(`http://localhost:3001/api/portfolio/${cardId}/canvas`, saveData)
      .catch(() => alert('存檔出錯'));
  },
};

export default CanvasService;
