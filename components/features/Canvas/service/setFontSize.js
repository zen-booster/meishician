import updateHistory from './updateHistory';

function setFontSize(e, canvas, activeObject, dispatch) {
  activeObject.set('fontSize', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setFontSize;
