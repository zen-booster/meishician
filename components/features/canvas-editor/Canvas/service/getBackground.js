const getBackground = (canvas) =>
  canvas.getObjects().filter((obj) => obj.id === 'background')[0];

export default getBackground;
