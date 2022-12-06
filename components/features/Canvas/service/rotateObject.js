import updateHistory from './updateHistory';

function rotateObject(e, canvas, activeObject, dispatch) {
  if (activeObject.id === 'background') return;
  const angle = activeObject.angle === -360 ? 0 : activeObject.angle;
  activeObject.set('angle', angle - 90);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default rotateObject;
