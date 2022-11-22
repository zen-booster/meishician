import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { MdDownload } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { fabricContext } from '../Canvas';
import Button from '../../../../common/Button/Button';
import getBackground from '../service/getBackground';
import saveCanvas from '../service/saveCanvas';
import loadCanvas from '../service/loadCanvas';
import { NO_UPDATE } from '../../../../../constants/constants';

function BottomBar() {
  const { canvasRef, activeObject, setActiveObject } =
    useContext(fabricContext);
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();
  const { undoBox, redoBox } = useSelector((state) => state.history);

  const flip = () => {
    console.log('flip the card');
  };

  const changeZoom = (e) => {
    const newZoom = e.target.value;
    const center = canvasRef.current.getCenter();
    canvasRef.current.zoomToPoint({ x: center.left, y: center.top }, newZoom);
    setZoom(newZoom);
  };

  const undo = () => {
    const itemId = activeObject.id;
    const { length } = undoBox;
    if (!length) return;
    dispatch({ type: NO_UPDATE });
    const preData = undoBox[length - 1];
    const order = { orderName: 'undo', dispatch };
    loadCanvas(canvasRef.current, preData, order);

    const background = getBackground(canvasRef.current);
    const target =
      canvasRef.current.getObjects().filter((obj) => obj.id === itemId)[0] ||
      background;

    canvasRef.current.centerObject(background);
    setActiveObject(target);
  };

  const redo = () => {
    const { length } = redoBox;
    if (!length) return;
    dispatch({ type: NO_UPDATE });
    const nextData = redoBox[length - 1];
    const order = { orderName: 'redo', dispatch };
    loadCanvas(canvasRef.current, nextData, order);

    const background = getBackground(canvasRef.current);
    canvasRef.current.centerObject(background);
    setActiveObject(background);
  };

  const save = () => {
    const canvasData = saveCanvas(canvasRef.current);
    localStorage.setItem('canvas', JSON.stringify(canvasData));
  };

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
        <Button className="cursor-pointer" onClick={flip}>
          翻轉卡片
        </Button>
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
      </div>
    </div>
  );
}

export default BottomBar;
