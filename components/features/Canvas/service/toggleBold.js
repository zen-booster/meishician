import updateHistory from './updateHistory';

function toggleBold(canvas, activeObject, dispatch) {
  const weight = activeObject.fontWeight === 'bold' ? 'normal' : 'bold';

  const type = activeObject?.get('type');
  if (type === 'activeSelection') {
    activeObject.forEachObject((obj) => {
      if (obj.get('type') === 'textbox') {
        if (obj.fontWeight === 'bold') {
          obj.set('fontWeight', 'normal');
        } else {
          obj.set('fontWeight', 'bold');
        }
      }
    });
  }

  activeObject.set('fontWeight', weight);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleBold;
