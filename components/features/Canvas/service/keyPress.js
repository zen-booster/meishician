import removeObject from './removeObject';
import { saveCanvas } from '../../../../store/actions';
import undo from './undo';
import redo from './redo';
import flip from './flip';

function keyPress(e, cardId, canvasRef, history, dispatch, pressKey) {
  const canvas = canvasRef.current;
  const key = e.key.toLowerCase();

  const activeObject = canvas.getActiveObject();
  if (activeObject?.get('type') === 'textbox' && activeObject.isEditing) return;

  // 大小寫問題待解決
  switch (key) {
    case 'backspace':
      removeObject(canvas, dispatch);
      break;
    case 's':
      e.preventDefault();
      if (pressKey.Control) dispatch(saveCanvas(cardId, canvasRef, history));
      break;
    case 'z':
      if (pressKey.Control) undo(canvas, history, dispatch);
      break;
    case 'y':
      if (pressKey.Control) redo(canvas, history, dispatch);
      break;
    case ' ':
      if (pressKey.Control) flip(canvas, history, dispatch);
      break;
    default:
  }

  canvas.renderAll();
}

export default keyPress;
