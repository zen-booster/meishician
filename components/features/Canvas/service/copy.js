import { fabric } from 'fabric-pure-browser';

function copy(canvas) {
  if (!canvas.getActiveObject()) return;
  canvas.getActiveObject().clone((cloned) => {
    fabric._clipboard = cloned;
  });
}

export default copy;
