import getBackground from './getBackground';
import setLoadData from './setLoadData';
import asyncLoadCanvas from './asyncLoadCanvas';
import toImage from './toImage';
import { NO_UPDATE, NEED_UPDATE } from '../../../../constants/constants';

async function setSaveData(canvasRef, history, dispatch) {
  dispatch({ type: NO_UPDATE });
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

  dispatch({ type: NEED_UPDATE });
  return saveData;
}

export default setSaveData;
