import { fabric } from 'fabric';

function putToCenter(object, positionData) {
  const {
    inHorizonCenter,
    widthCenter,
    inVerticalCenter,
    heightCenter,
    objectCenter,
  } = positionData;

  // setPositionByOrigin(pos, originX, originY)
  object.setPositionByOrigin(
    new fabric.Point(
      inHorizonCenter ? widthCenter : objectCenter.x,
      inVerticalCenter ? heightCenter : objectCenter.y
    ),
    'center', // 物件x軸放置位置
    'center' // 物件y軸放置位置
  );
}

export default putToCenter;
