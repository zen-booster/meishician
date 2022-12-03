import { fabric } from 'fabric';
import { CANVAS, BACKGROUND } from './config/objectConfig';
import removeResize from './service/removeResize';
import showCenterLine from './service/showCenterLine';
import putToCenter from './service/putToCenter';
import aligningGuidelines from './service/aligningGuideline';
import getBackground from './service/getBackground';
import { SET_ACTIVE } from '../../../constants/constants';

const initCanvas = (dispatch) => {
  const fabricCanvas = new fabric.Canvas('canvas', { ...CANVAS });
  let inHorizonCenter = false;
  let inVerticalCenter = false;

  const ctx = fabricCanvas.getSelectionContext();

  // 物件移動處理
  fabricCanvas.on('object:moving', function (e) {
    const object = e.target;
    const objectCenter = object.getCenterPoint();
    const transform = this._currentTransform;
    const lineMargin = 4;

    const widthCenter = this.width / 2;
    const heightCenter = this.height / 2;

    const widthCenterRange = [
      widthCenter - lineMargin,
      widthCenter + lineMargin,
    ];
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
  });

  // 離開時將對齊線刪除
  fabricCanvas.on('before:render', function () {
    this.clearContext(ctx);
  });

  // 條件符合時顯示對齊線
  fabricCanvas.on('after:render', function () {
    const zoom = this.getZoom();
    const rowLinePosition = this.width / zoom / 2 + 0.5;
    const verticalLinePosition = this.height / zoom / 2 + 0.5;

    if (inVerticalCenter) {
      showCenterLine(
        0,
        verticalLinePosition,
        this.width / zoom,
        verticalLinePosition,
        ctx,
        fabricCanvas
      );
    }
    if (inHorizonCenter) {
      showCenterLine(
        rowLinePosition,
        0,
        rowLinePosition,
        this.height / zoom,
        ctx,
        fabricCanvas
      );
    }
  });

  // 結束滑動時刪除對齊線
  fabricCanvas.on('mouse:up', function () {
    inHorizonCenter = null;
    inVerticalCenter = null;
    this.renderAll();
  });

  // 選取物件
  fabricCanvas.on('selection:cleared', () =>
    dispatch({ type: SET_ACTIVE, payload: getBackground(fabricCanvas) })
  );

  fabricCanvas.on('selection:updated', (e) => {
    const object = e.selected[0];
    if (object.get('type') === 'textbox' || object.get('type') === 'line') {
      removeResize(object);
    }
    dispatch({ type: SET_ACTIVE, payload: object });
  });

  fabricCanvas.on('selection:created', (e) => {
    const object = e.selected[0];
    if (object.get('type') === 'textbox' || object.get('type') === 'line') {
      removeResize(object);
    }
    dispatch({ type: SET_ACTIVE, payload: object });
  });

  aligningGuidelines(fabricCanvas);

  const background = new fabric.Rect(BACKGROUND);
  fabricCanvas.centerObject(background);
  fabricCanvas.add(background);
  dispatch({ type: SET_ACTIVE, payload: background });

  return fabricCanvas;
};

export default initCanvas;
