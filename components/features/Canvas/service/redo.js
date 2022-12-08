import {
  NO_UPDATE,
  SET_ACTIVE,
  NEED_UPDATE,
  REDO,
} from '../../../../constants/constants';
import getBackground from './getBackground';
import setLoadData from './setLoadData';

function redo(canvas, history, dispatch) {
  const { redoBox } = history;
  const { length } = redoBox;
  if (!length) return;

  dispatch({ type: NO_UPDATE });
  const { front, back, position } = redoBox[length - 1];
  if (position === 'front') {
    const loadData = setLoadData(canvas, front);
    canvas.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: REDO });
      const background = getBackground(canvas);
      canvas.clipPath = background;
      canvas.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  }
  if (position === 'back') {
    const loadData = setLoadData(canvas, back);
    canvas.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: REDO });
      const background = getBackground(canvas);
      canvas.clipPath = background;
      canvas.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  }
}

export default redo;
