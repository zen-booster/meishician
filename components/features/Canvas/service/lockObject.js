import updateHistory from './updateHistory';

function lockObject(canvas, activeObject, dispatch) {
  if (activeObject.id === 'background') return;
  const { lockMovementX, lockMovementY, evented } = activeObject;
  activeObject.set('lockMovementX', !lockMovementX);
  activeObject.set('lockMovementY', !lockMovementY);
  activeObject.set('evented', !evented);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default lockObject;
