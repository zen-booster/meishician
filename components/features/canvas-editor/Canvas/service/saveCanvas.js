function saveCanvas(canvas) {
  const { objects, ...data } = canvas.toJSON(['id', 'selectable', 'evented']);

  const background = objects.shift();

  // save the position of obj in background, not in canvas
  const newObjects = objects.map((obj) => ({
    ...obj,
    top: obj.top - background.top,
    left: obj.left - background.left,
  }));

  newObjects.unshift(background);

  const saveData = { ...data, objects: newObjects };
  return saveData;
}

export default saveCanvas;
