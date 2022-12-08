import updateHistory from './updateHistory';

function setBackward(canvas, activeObject, dispatch) {
  if (activeObject.id === 'background') return;
  const position = canvas.getObjects().indexOf(activeObject);
  if (position === 1) return;
  canvas.sendBackwards(activeObject);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setBackward;
