import updateHistory from './updateHistory';

function selectFont(e, canvas, activeObject, dispatch) {
  activeObject.set('fontFamily', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default selectFont;
