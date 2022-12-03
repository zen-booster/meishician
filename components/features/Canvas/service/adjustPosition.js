import putToCenter from './putToCenter';

function adjustPosition(e, inHorizonCenter, inVerticalCenter, fabricCanvas) {
  const object = e.target;
  const objectCenter = object.getCenterPoint();
  const transform = fabricCanvas._currentTransform;
  const lineMargin = 4;

  const widthCenter = fabricCanvas.width / 2;
  const heightCenter = fabricCanvas.height / 2;

  const widthCenterRange = [widthCenter - lineMargin, widthCenter + lineMargin];
  const heightCenterRange = [
    heightCenter - lineMargin,
    heightCenter + lineMargin,
  ];

  if (!transform) return;

  inHorizonCenter =
    objectCenter.x >= widthCenterRange[0] &&
    objectCenter.x <= widthCenterRange[1];
  inVerticalCenter =
    objectCenter.y >= heightCenterRange[0] &&
    objectCenter.y <= heightCenterRange[1];

  const positionData = {
    inHorizonCenter,
    widthCenter,
    inVerticalCenter,
    heightCenter,
    objectCenter,
  };

  if (inHorizonCenter || inVerticalCenter) {
    putToCenter(object, positionData);
  }
}

export default adjustPosition;
