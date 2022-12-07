import {
  FLIP,
  NO_UPDATE,
  NEED_UPDATE,
  UPDATE,
  SET_ACTIVE,
} from '../../../../constants/constants';
import getBackground from './getBackground';
import serialize from './serialize';
import setLoadData from './setLoadData';

function flip(canvas, history, dispatch) {
  const { front, back, position } = history.state;
  const serializedData = serialize(canvas);
  dispatch({
    type: UPDATE,
    payload: { newState: serializedData },
  });

  dispatch({ type: NO_UPDATE });

  if (position === 'front') {
    const loadData = setLoadData(canvas, back);
    canvas.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: FLIP });
      const background = getBackground(canvas);
      canvas.clipPath = background;
      canvas.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  }
  if (position === 'back') {
    const loadData = setLoadData(canvas, front);
    canvas.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: FLIP });
      const background = getBackground(canvas);
      canvas.clipPath = background;
      canvas.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  }
}

export default flip;
