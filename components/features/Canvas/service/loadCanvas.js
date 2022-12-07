import getCenterPosition from './getCenterPosition';
import { NEED_UPDATE, SET_ACTIVE } from '../../../../constants/constants';
import getBackground from './getBackground';

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
      case 'load':
        dispatch({ type: NEED_UPDATE });
        break;
      default:
    }
    const background = getBackground(canvas);
    canvas.clipPath = background;
    canvas.renderAll();
    dispatch({ type: SET_ACTIVE, payload: background });
  });
};

export default loadCanvas;
