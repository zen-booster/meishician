import { toast } from 'react-toastify';

export const ToastifyService = {
  sendToast(text) {
    toast(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  },
};
