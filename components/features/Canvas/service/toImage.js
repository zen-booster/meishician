function toImage(canvas, background) {
  const zoom = canvas.getZoom();
  const center = canvas.getCenter();

  if (zoom !== 1) canvas.zoomToPoint({ x: center.left, y: center.top }, 1);

  const pngFile = canvas.toDataURL({
    width: background.width,
    height: background.height,
    left: background.left,
    top: background.top,
    multiplier: 1.5,
    format: 'png',
  });

  if (zoom !== 1) canvas.zoomToPoint({ x: center.left, y: center.top }, zoom);

  return pngFile;
}

export default toImage;
