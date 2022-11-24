function showCenterLine(x1, y1, x2, y2, ctx, fabricCanvas) {
  ctx.save();
  ctx.strokeStyle = '#ff0000';
  ctx.lineWidth = 1;
  ctx.beginPath();

  // scaleX, skewY, skewX, scaleY, translation, and translationY
  const { viewportTransform } = fabricCanvas;
  ctx.moveTo(x1 * viewportTransform[0], y1 * viewportTransform[3]);
  ctx.lineTo(x2 * viewportTransform[0], y2 * viewportTransform[3]);

  ctx.stroke();
  ctx.restore();
}

export default showCenterLine;
