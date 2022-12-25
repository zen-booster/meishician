import updateHistory from './updateHistory';

function toggleUnderline(canvas, activeObject, dispatch) {
  const toggle = activeObject.underline !== true;

  const type = activeObject?.get('type');
  if (type === 'activeSelection') {
    activeObject.forEachObject((obj) => {
      if (obj.get('type') === 'textbox') {
        if (obj.underline) {
          obj.set('underline', false);
        } else {
          obj.set('underline', true);
        }
      }
    });
  }

  activeObject.set('underline', toggle);
  canvas.renderAll();
  updateHistory(canvas, dispatch);
}

export default toggleUnderline;
