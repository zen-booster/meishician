import updateHistory from './updateHistory';

function selectFont(e, canvas, activeObject, dispatch) {
  const type = activeObject?.get('type');
  if (type === 'activeSelection') {
    activeObject.forEachObject((obj) => {
      if (obj.get('type') === 'textbox') {
        obj.set('fontFamily', e.target.value);
      }
    });
  }
  activeObject.set('fontFamily', e.target.value);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default selectFont;
