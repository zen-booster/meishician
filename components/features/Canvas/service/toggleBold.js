import updateHistory from './updateHistory';

function toggleBold(canvas, activeObject, dispatch) {
  const weight = activeObject.fontWeight === 'normal' ? 'bold' : 'normal';
  activeObject.set('fontWeight', weight);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleBold;
