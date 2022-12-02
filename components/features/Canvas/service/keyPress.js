import removeObject from './removeObject';
import { saveCanvas } from '../../../../store/actions';
import undo from './undo';
import redo from './redo';
import flip from './flip';

function keyPress(e, cardId, canvasRef, activeObject, history, dispatch) {
  if (!activeObject) return;
  const canvas = canvasRef.current;
  console.log(e.key);

  switch (e.key) {
    case 'Backspace':
      removeObject(canvas, dispatch);
      break;
    case 'Control' && 's':
      e.preventDefault();
      dispatch(saveCanvas(cardId, canvasRef, history));
      break;
    case 'Control' && 'z':
      undo(canvas, history, dispatch);
      break;
    case 'Control' && 'y':
      redo(canvas, history, dispatch);
      break;
    case 'Control' && 'f':
      flip(canvas, history, dispatch);
      break;
    default:
  }

  canvas.renderAll();
}

export default keyPress;
