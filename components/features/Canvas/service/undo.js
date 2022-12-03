import { SET_ACTIVE, NO_UPDATE } from '../../../../constants/constants';
import getBackground from './getBackground';
import loadCanvas from './loadCanvas';

function undo(canvas, history, dispatch) {
  const { undoBox } = history;
  const { length } = undoBox;
  if (!length) return;

  dispatch({ type: NO_UPDATE });
  const order = { orderName: 'undo', dispatch };
  const { front, back, position } = undoBox[length - 1];
  if (position === 'front') loadCanvas(canvas, front, order);
  if (position === 'back') loadCanvas(canvas, back, order);

  const background = getBackground(canvas);
  canvas.centerObject(background);
  dispatch({ type: SET_ACTIVE, payload: background });
}

export default undo;
