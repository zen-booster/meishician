import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { MdDownload } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { fabricContext } from '../Canvas';
import getBackground from '../service/getBackground';
import serialize from '../service/serialize';
import loadCanvas from '../service/loadCanvas';
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
    const canvasData = serialize(canvasRef.current);
    localStorage.setItem('canvas', JSON.stringify(canvasData));
  };

  // 基本沒有這功能
  const load = () => {
    dispatch({ type: NO_UPDATE });
    const canvasData = JSON.parse(localStorage.getItem('canvas'));
    const order = { orderName: 'load', dispatch };
    loadCanvas(canvasRef.current, canvasData, order);
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

  const download = () => {
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
        <MdDownload className="h-6 w-6 cursor-pointer" onClick={load} />
        <GrUndo onClick={undo} className="h-6 w-6 cursor-pointer" />
        <GrRedo onClick={redo} className="h-6 w-6 cursor-pointer" />
        <button
          className="bg-green-300 py-1 px-2"
          onClick={checkResult}
          type="button"
        >
          確認效果
        </button>
        <button
          className="bg-green-300 py-1 px-2"
          onClick={download}
          type="button"
        >
          下載
        </button>
        <span className="bg-green-300 px-2 py-1">
          目前位置： {state.position}
        </span>
      </div>
    </div>
  );
}

export default BottomBar;
