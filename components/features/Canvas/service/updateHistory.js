import { UPDATE } from '../../../../constants/constants';
import serialize from './serialize';

function updateHistory(canvas, dispatch) {
  const serializedData = serialize(canvas);
  dispatch({
    type: UPDATE,
    payload: { newState: serializedData },
  });
}

export default updateHistory;
