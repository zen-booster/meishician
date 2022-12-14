import { TOGGLE_LOADER } from '../../../../constants/constants';
import { saveToStorage } from '../../../../store/actions';
import setSaveData from './setSaveData';

async function saveCanvas(cardId, canvasRef, history, dispatch) {
  dispatch({ type: TOGGLE_LOADER });
  const saveData = await setSaveData(canvasRef, history, dispatch);
  dispatch(saveToStorage(cardId, saveData));
}

export default saveCanvas;
