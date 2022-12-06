import updateHistory from './updateHistory';

function setForward(canvas, activeObject, dispatch) {
  if (activeObject.id === 'background') return;
  canvas.bringForward(activeObject);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setForward;
