import updateHistory from './updateHistory';

const removeObject = (canvas, dispatch) => {
  if (!canvas.getActiveObject()) return;
  canvas.remove(canvas.getActiveObject());
  canvas.renderAll();
  updateHistory(canvas, dispatch);
};

export default removeObject;
