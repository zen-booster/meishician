import { NO_UPDATE, SET_ACTIVE } from '../../../../constants/constants';
import getBackground from './getBackground';
import loadCanvas from './loadCanvas';

function redo(canvas, history, dispatch) {
  const { redoBox } = history;
  const { length } = redoBox;
  if (!length) return;

  dispatch({ type: NO_UPDATE });
  const order = { orderName: 'redo', dispatch };
  const { front, back, position } = redoBox[length - 1];
  if (position === 'front') loadCanvas(canvas, front, order);
  if (position === 'back') loadCanvas(canvas, back, order);

  const background = getBackground(canvas);
  canvas.centerObject(background);
  dispatch({ type: SET_ACTIVE, payload: background });
}

export default redo;
