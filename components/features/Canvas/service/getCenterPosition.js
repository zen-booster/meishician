// Position which can put objects to center canvas

const getCenterPosition = (canvas, obj) => {
  const center = {
    x: Math.round(canvas.width) / 2,
    y: Math.round(canvas.height) / 2,
  };
  const objRadius = {
    width: Math.round(obj.width) / 2,
    height: Math.round(obj.height) / 2,
  };

  return {
    x: center.x - objRadius.width,
    y: center.y - objRadius.height,
  };
};

export default getCenterPosition;
