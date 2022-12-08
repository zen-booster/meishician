import updateHistory from './updateHistory';

function setForward(canvas, activeObject, dispatch) {
  if (activeObject.id === 'background') return;
  if (
    canvas.getObjects().indexOf(activeObject) ===
    canvas.getObjects().length - 1
  )
    return;
  canvas.bringForward(activeObject);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default setForward;
