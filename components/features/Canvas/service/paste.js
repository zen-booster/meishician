import { fabric } from 'fabric-pure-browser';
import setCorner from './setCorner';
import { NO_UPDATE, NEED_UPDATE } from '../../../../constants/constants';
import updateHistory from './updateHistory';

function paste(canvas, dispatch) {
  if (!fabric._clipboard) return;
  // clone again, so you can do multiple copies.
  fabric._clipboard.clone((clonedObj) => {
    dispatch({ type: NO_UPDATE });
    canvas.discardActiveObject();
    if (clonedObj._objects) clonedObj._objects.map((obj) => setCorner(obj));
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
    });
    if (clonedObj.type === 'activeSelection') {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((obj) => {
        canvas.add(obj);
      });
      // solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    // move to new obj position for next paste
    fabric._clipboard.top += 10;
    fabric._clipboard.left += 10;
    dispatch({ type: NEED_UPDATE });
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
    updateHistory(canvas, dispatch);
  });
}

export default paste;
