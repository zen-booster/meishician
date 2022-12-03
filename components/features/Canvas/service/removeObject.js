import updateHistory from './updateHistory';

const removeObject = (canvas, dispatch) => {
  canvas.remove(canvas.getActiveObject());
  updateHistory(canvas, dispatch);
};

export default removeObject;
