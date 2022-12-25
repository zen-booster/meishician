function changeColor(color, canvas, activeObject, setObjColor) {
  const { r, g, b, a } = color.rgb;
  const rgba = `rgba(${r},${g},${b},${a})`;
  setObjColor(rgba);

  const type = activeObject?.get('type');
  switch (type) {
    case 'line':
      activeObject.set('stroke', rgba);
      break;
    case 'activeSelection':
      activeObject.forEachObject((obj) => {
        activeObject.set('fill', rgba);
        if (obj.get('type') === 'line') {
          obj.set('stroke', rgba);
        } else {
          obj.set('fill', rgba);
        }
      });
      break;
    default:
      activeObject.set('fill', rgba);
      break;
  }

  canvas.renderAll();
}

export default changeColor;
