import getCenterPosition from './getCenterPosition';
import { UNDO, REDO, NEED_UPDATE } from '../../../../../constants/constants';

const loadCanvas = (canvas, canvasData, order) => {
  const { objects, ...data } = canvasData;
  const { orderName, dispatch } = order;

  const backgroundData = objects.filter((obj) => obj.id === 'background')[0];
  const allObjects = objects.filter((obj) => obj.id !== 'background');

  const center = getCenterPosition(canvas, backgroundData);
  const newObjects = allObjects.map((obj) => ({
    ...obj,
    top: obj.top + center.y,
    left: obj.left + center.x,
  }));

  const newBackground = {
    ...backgroundData,
    top: center.y,
    left: center.x,
  };

  newObjects.unshift(newBackground);

  const loadData = { ...data, objects: newObjects };

  canvas.loadFromJSON(loadData, () => {
    switch (orderName) {
      case 'undo':
        dispatch({ type: NEED_UPDATE });
        dispatch({ type: UNDO });
        break;
      case 'redo':
        dispatch({ type: NEED_UPDATE });
        dispatch({ type: REDO });
        break;
      case 'load':
        dispatch({ type: NEED_UPDATE });
        break;
      default:
    }
  });
};

export default loadCanvas;
