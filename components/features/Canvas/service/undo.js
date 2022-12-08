import {
  SET_ACTIVE,
  NO_UPDATE,
  NEED_UPDATE,
  UNDO,
} from '../../../../constants/constants';
import getBackground from './getBackground';
import setLoadData from './setLoadData';

function undo(canvas, history, dispatch) {
  const { undoBox } = history;
  const { length } = undoBox;
  if (!length) return;

  dispatch({ type: NO_UPDATE });
  const { front, back, position } = undoBox[length - 1];
  if (position === 'front') {
    const loadData = setLoadData(canvas, front);
    canvas.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: UNDO });
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
      dispatch({ type: UNDO });
      const background = getBackground(canvas);
      canvas.clipPath = background;
      canvas.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  }
}

export default undo;
