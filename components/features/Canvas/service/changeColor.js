import updateHistory from './updateHistory';

function changeColor(e, canvas, activeObject, dispatch) {
  if (activeObject.isType('line')) {
    activeObject.set('stroke', e.target.value);
  } else {
    activeObject.set('fill', e.target.value);
  }
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default changeColor;
