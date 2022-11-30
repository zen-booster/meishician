function toImage(canvas, background) {
  return canvas.toDataURL({
    width: background.width,
    height: background.height,
    left: background.left,
    top: background.top,
    format: 'png',
  });
}

export default toImage;