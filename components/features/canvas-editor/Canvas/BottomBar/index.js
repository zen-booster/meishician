import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { FaRegSave } from 'react-icons/fa';
import axios from 'axios';
import { fabricContext } from '../Canvas';
import getBackground from '../service/getBackground';
import serialize from '../service/serialize';
import loadCanvas from '../service/loadCanvas';
import toImage from '../service/toImage';
import {
  UPDATE,
  NO_UPDATE,
  SET_ACTIVE,
} from '../../../../../constants/constants';

function BottomBar() {
  const { canvasRef } = useContext(fabricContext);
  const [zoom, setZoom] = useState(1);
  const { undoBox, redoBox, state } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const flip = () => {
    const { front, back, position } = state;
    const serializedData = serialize(canvasRef.current);
    const order = { orderName: 'flip', dispatch };
    dispatch({
      type: UPDATE,
      payload: {
        newState: serializedData,
      },
    });

    dispatch({ type: NO_UPDATE });
    switch (position) {
      case 'front':
        loadCanvas(canvasRef.current, back, order);
        break;
      case 'back':
        loadCanvas(canvasRef.current, front, order);
        break;
      default:
    }
  };

  const changeZoom = (e) => {
    const newZoom = e.target.value;
    const center = canvasRef.current.getCenter();
    canvasRef.current.zoomToPoint({ x: center.left, y: center.top }, newZoom);
    setZoom(newZoom);
  };

  const undo = () => {
    const { length } = undoBox;
    if (!length) return;

    dispatch({ type: NO_UPDATE });
    const order = { orderName: 'undo', dispatch };
    const { front, back, position } = undoBox[length - 1];
    if (position === 'front') loadCanvas(canvasRef.current, front, order);
    if (position === 'back') loadCanvas(canvasRef.current, back, order);

    const background = getBackground(canvasRef.current);
    canvasRef.current.centerObject(background);
    dispatch({ type: SET_ACTIVE, payload: background });
  };

  const redo = () => {
    const { length } = redoBox;
    if (!length) return;

    dispatch({ type: NO_UPDATE });
    const order = { orderName: 'redo', dispatch };
    const { front, back, position } = redoBox[length - 1];
    if (position === 'front') loadCanvas(canvasRef.current, front, order);
    if (position === 'back') loadCanvas(canvasRef.current, back, order);

    const background = getBackground(canvasRef.current);
    canvasRef.current.centerObject(background);
    dispatch({ type: SET_ACTIVE, payload: background });
  };

  const save = () => {
    const { front, back, position } = state;
    const background = getBackground(canvasRef.current);

    const canvasData = {
      front: JSON.stringify(state.front),
      back: JSON.stringify(state.back),
    };

    // get image of two side
    dispatch({ type: NO_UPDATE });
    const order = { orderName: null, dispatch };
    loadCanvas(canvasRef.current, front, order);
    const frontImage = toImage(canvasRef.current, background);
    loadCanvas(canvasRef.current, back, order);
    const backImage = toImage(canvasRef.current, background);

    // get back where you are
    order.orderName = 'load';
    if (position === 'front') loadCanvas(canvasRef.current, front, order);
    if (position === 'back') loadCanvas(canvasRef.current, back, order);

    const layoutDirection =
      background.width > background.height ? 'horizontal' : 'vertical';

    axios
      .patch(
        'http://localhost:3001/api/portfolio/6385f4e6f109114af6dcb0fd/canvas',
        {
          canvasData,
          layoutDirection,
          cardImageData: {
            front: frontImage,
            back: backImage,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const checkResult = () => {
    const background = getBackground(canvasRef.current);
    const dataURL = canvasRef.current.toDataURL({
      width: background.width,
      height: background.height,
      left: background.left,
      top: background.top,
      format: 'png',
    });
    console.log(dataURL);
  };

  return (
    <div className="flex-1 bg-gray-400">
      <div className="flex items-center gap-3 p-5">
        <button
          className="cursor-pointer bg-green-300 py-1 px-2"
          onClick={flip}
          type="button"
        >
          翻轉卡片
        </button>
        <input
          type="range"
          max={2}
          min={0.01}
          step={0.01}
          value={zoom}
          onChange={changeZoom}
        />
        <span className="bg-white py-1 px-2">
          比例：{Math.round(zoom * 100)} %
        </span>
        <FaRegSave className="h-6 w-6 cursor-pointer" onClick={save} />
        <GrUndo onClick={undo} className="h-6 w-6 cursor-pointer" />
        <GrRedo onClick={redo} className="h-6 w-6 cursor-pointer" />
        <button
          className="bg-green-300 py-1 px-2"
          onClick={checkResult}
          type="button"
        >
          確認效果
        </button>
        <span className="bg-green-300 px-2 py-1">
          目前位置： {state.position}
        </span>
      </div>
    </div>
  );
}

export default BottomBar;
