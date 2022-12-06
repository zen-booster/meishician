import updateHistory from './updateHistory';

function toggleUnderline(canvas, activeObject, dispatch) {
  const toggle = activeObject.underline !== true;
  activeObject.set('underline', toggle);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleUnderline;
