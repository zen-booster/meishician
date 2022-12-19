import updateHistory from './updateHistory';

function setLineHeight(e, canvas, activeObject, dispatch) {
  activeObject.set('lineHeight', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setLineHeight;
