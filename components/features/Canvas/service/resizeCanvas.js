import getBackground from './getBackground';

const resizeCanvas = (outer, canvas) => {
  const background = getBackground(canvas);

  // avoid error caused by pre-render
  if (!background) return;

  const objects = canvas.getObjects().filter((obj) => obj.id !== 'background');

  const oldCenter = background.getPointByOrigin('center');

  canvas.setWidth(outer.offsetWidth);
  canvas.setHeight(outer.offsetHeight);
  canvas.centerObject(background);
  canvas.clipPath = background;

  const newCenter = background.getPointByOrigin('center');

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
