import updateHistory from './updateHistory';

const removeObject = (canvas, dispatch) => {
  canvas.remove(canvas.getActiveObject());
  canvas.renderAll();
  updateHistory(canvas, dispatch);
};

export default removeObject;
