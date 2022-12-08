import { NO_UPDATE, TOGGLE_LOADER } from '../../../../constants/constants';
import setLoadData from './setLoadData';
import getBackground from './getBackground';
import toImage from './toImage';
import asyncLoadCanvas from './asyncLoadCanvas';
import { saveToStorage } from '../../../../store/actions';

async function saveCanvas(cardId, canvasRef, history, dispatch) {
  dispatch({ type: NO_UPDATE });
  dispatch({ type: TOGGLE_LOADER });
  const background = getBackground(canvasRef.current);
  const { front, back, position } = history.state;
  const frontLoadData = setLoadData(canvasRef.current, front);
  const backLoadData = setLoadData(canvasRef.current, back);
  const saveData = {
    canvasData: { front: JSON.stringify(front), back: JSON.stringify(back) },
    layoutDirection:
      background.width > background.height ? 'horizontal' : 'vertical',
    cardImageData: { front: null, back: null },
  };
  if (position === 'front') {
    saveData.cardImageData.front = toImage(canvasRef.current, background);
    await asyncLoadCanvas(canvasRef.current, backLoadData, dispatch);
    saveData.cardImageData.back = toImage(canvasRef.current, background);
    await asyncLoadCanvas(canvasRef.current, frontLoadData, dispatch);
  } else {
    saveData.cardImageData.back = toImage(canvasRef.current, background);
    await asyncLoadCanvas(canvasRef.current, frontLoadData, dispatch);
    saveData.cardImageData.front = toImage(canvasRef.current, background);
    await asyncLoadCanvas(canvasRef.current, backLoadData, dispatch);
  }
  dispatch(saveToStorage(cardId, saveData));
}

export default saveCanvas;
