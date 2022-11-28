import getBackground from './getBackground';

const resizeCanvas = (outer, canvas) => {
  const background = getBackground(canvas);
  const objects = canvas.getObjects().filter((obj) => obj.id !== 'background');

  const oldCenter = background?.getPointByOrigin('center');

  canvas.setWidth(outer.offsetWidth);
  canvas.setHeight(outer.offsetHeight);
  canvas.centerObject(background);

  // cause error outside of Canvas without "?" mark, reason not found yet
  // warn when closing dev
  const newCenter = background?.getPointByOrigin('center');

  const displacement = {
    x: newCenter.x - oldCenter.x,
    y: newCenter.y - oldCenter.y,
  };

  objects.forEach((obj) => {
    obj.set('top', obj.top + displacement.y);
    obj.set('left', obj.left + displacement.x);
    obj.setCoords();
  });

  canvas.renderAll();
};

export default resizeCanvas;
