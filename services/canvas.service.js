import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const CanvasService = {
  getCanvas(cardId) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios
      .get(`${DOMAIN_URL}/api/portfolio/${cardId}/canvas`)
      .then((res) => {
        const front = JSON.parse(res.data.data.canvasData.front);
        const back = JSON.parse(res.data.data.canvasData.back);
        return { front, back };
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default CanvasService;
