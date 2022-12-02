import { NO_UPDATE, UPDATE } from '../../../../constants/constants';
import serialize from './serialize';
import loadCanvas from './loadCanvas';

function flip(canvas, history, dispatch) {
  const { front, back, position } = history.state;
  const serializedData = serialize(canvas);
  const order = { orderName: 'flip', dispatch };
  dispatch({
    type: UPDATE,
    payload: {
      newState: serializedData,
    },
  });

  dispatch({ type: NO_UPDATE });
  switch (position) {
    case 'front':
      loadCanvas(canvas, back, order);
      break;
    case 'back':
      loadCanvas(canvas, front, order);
      break;
    default:
  }
}

export default flip;
