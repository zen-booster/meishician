import updateHistory from './updateHistory';

function changeColor(e, canvas, activeObject, dispatch) {
  activeObject.set('fill', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default changeColor;
