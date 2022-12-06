import updateHistory from './updateHistory';

function setFontSpace(e, canvas, activeObject, dispatch) {
  activeObject.set('charSpacing', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setFontSpace;
