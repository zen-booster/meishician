export function rotateCalculate(deg, width, height) {
  const angle = (deg * Math.PI) / 180;
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);

  // (0,0) stays as (0, 0)

  // (w,0) rotation
  const x1 = cos * width;
  const y1 = sin * width;

  // (0,h) rotation
  const x2 = -sin * height;
  const y2 = cos * height;

  // (w,h) rotation
  const x3 = cos * width - sin * height;
  const y3 = sin * width + cos * height;

  const minX = Math.min(0, x1, x2, x3);
  const maxX = Math.max(0, x1, x2, x3);
  const minY = Math.min(0, y1, y2, y3);
  const maxY = Math.max(0, y1, y2, y3);

  const rotatedWidth = maxX - minX;
  const rotatedHeight = maxY - minY;

  return [rotatedWidth, rotatedHeight];
}
