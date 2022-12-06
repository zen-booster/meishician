import updateHistory from './updateHistory';

function toggleItalic(canvas, activeObject, dispatch) {
  const style = activeObject.fontStyle === 'normal' ? 'italic' : 'normal';
  activeObject.set('fontStyle', style);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleItalic;
