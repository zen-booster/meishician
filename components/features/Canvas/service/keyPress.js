import removeObject from './removeObject';
import saveCanvas from './saveCanvas';
import undo from './undo';
import redo from './redo';
import flip from './flip';
import toggleBold from './toggleBold';
import toggleItalic from './toggleItalic';
import toggleUnderline from './toggleUnderline';

function keyPress(e, cardId, canvasRef, history, dispatch, pressKey) {
  const canvas = canvasRef.current;
  const key = e.key.toLowerCase();

  const activeObject = canvas.getActiveObject();
  if (activeObject?.settingColor || activeObject?.settingWidthColor) return;
  if (activeObject?.get('type') === 'textbox' && activeObject.settingText)
    return;

  // 大小寫問題待解決
  switch (key) {
    case 'backspace':
      if (activeObject?.isEditing) return;
      removeObject(canvas, activeObject, dispatch);
      break;
    case 'delete':
      if (activeObject?.isEditing) return;
      removeObject(canvas, activeObject, dispatch);
      break;
    case 's':
      e.preventDefault();
      if (pressKey.Control) saveCanvas(cardId, canvasRef, history, dispatch);
      break;
    case 'z':
      if (pressKey.Control) undo(canvas, history, dispatch);
      break;
    case 'y':
      if (pressKey.Control) redo(canvas, history, dispatch);
      break;
    case 'b':
      if (pressKey.Control && activeObject?.get('type') === 'textbox')
        toggleBold(canvas, activeObject, dispatch);
      break;
    case 'i':
      e.preventDefault();
      if (pressKey.Control && activeObject?.get('type') === 'textbox')
        toggleItalic(canvas, activeObject, dispatch);
      break;
    case 'u':
      e.preventDefault();
      if (pressKey.Control && activeObject?.get('type') === 'textbox')
        toggleUnderline(canvas, activeObject, dispatch);
      break;
    case ' ':
      if (pressKey.Control) flip(canvas, history, dispatch);
      break;
    default:
  }

  canvas.renderAll();
}

export default keyPress;
