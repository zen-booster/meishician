import updateHistory from './updateHistory';

function toggleItalic(canvas, activeObject, dispatch) {
  const style = activeObject.fontStyle === 'italic' ? 'normal' : 'italic';

  const type = activeObject?.get('type');
  if (type === 'activeSelection') {
    activeObject.forEachObject((obj) => {
      if (obj.get('type') === 'textbox') {
        if (obj.fontStyle === 'italic') {
          obj.set('fontStyle', 'normal');
        } else {
          obj.set('fontStyle', 'italic');
        }
      }
    });
  }

  activeObject.set('fontStyle', style);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleItalic;
