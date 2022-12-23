import updateHistory from './updateHistory';

const removeObject = (canvas, activeObject, dispatch) => {
  if (!canvas.getActiveObject()) return;
  if (activeObject.id === 'background') return;

  const multipleSelect = canvas.getActiveObjects().length > 1;
  if (multipleSelect) {
    const activeObjects = canvas.getActiveObjects();
    canvas.remove(...activeObjects);
    canvas.discardActiveObject();
  } else {
    canvas.remove(canvas.getActiveObject());
  }

  canvas.renderAll();
  updateHistory(canvas, dispatch);
};

export default removeObject;
