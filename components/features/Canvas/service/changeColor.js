function changeColor(color, canvas, activeObject, setObjColor) {
  const { r, g, b, a } = color.rgb;
  const rgba = `rgba(${r},${g},${b},${a})`;
  setObjColor(rgba);
  if (activeObject.isType('line')) {
    activeObject.set('stroke', rgba);
  } else {
    activeObject.set('fill', rgba);
  }
  canvas.renderAll();
}

export default changeColor;
