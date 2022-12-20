import axios from 'axios';
import { DOMAIN_URL } from '../configs';

const UploadService = {
  uploadImage(file) {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    return axios.post(`${DOMAIN_URL}/api/upload/image`, file.data);
  },
};

export default UploadService;
