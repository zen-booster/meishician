import updateHistory from './updateHistory';

function setTextAlign(canvas, activeObject, dispatch) {
  const { textAlign } = activeObject;
  switch (textAlign) {
    case 'left':
      activeObject.set('textAlign', 'center');
      break;
    case 'center':
      activeObject.set('textAlign', 'right');
      break;
    default:
      activeObject.set('textAlign', 'left');
  }
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setTextAlign;
