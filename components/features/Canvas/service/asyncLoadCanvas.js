import getBackground from './getBackground';
import { SET_ACTIVE } from '../../../../constants/constants';

function asyncLoadCanvas(canvas, canvasData, dispatch) {
  return new Promise((resolve, reject) => {
    try {
      canvas.loadFromJSON(canvasData, () => {
        const background = getBackground(canvas);
        canvas.clipPath = background;
        canvas.renderAll();
        dispatch({ type: SET_ACTIVE, payload: background });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default asyncLoadCanvas;
