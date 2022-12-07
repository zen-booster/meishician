import getCenterPosition from './getCenterPosition';

const setLoadData = (canvas, canvasData) => {
  const { objects, ...data } = canvasData;

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

  return { ...data, objects: newObjects };
};

export default setLoadData;
