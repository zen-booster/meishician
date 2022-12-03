import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrRedo, GrUndo } from 'react-icons/gr';
import { FaRegSave } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { fabricContext } from '../Canvas';
import getBackground from '../service/getBackground';
import { saveCanvas } from '../../../../store/actions';
import undo from '../service/undo';
import redo from '../service/redo';
import flip from '../service/flip';

function BottomBar() {
  const router = useRouter();
  const { cardId } = router.query;
  const canvasRef = useContext(fabricContext);
  const [zoom, setZoom] = useState(1);
  const { history } = useSelector((state) => state);
  const dispatch = useDispatch();

  const changeZoom = (e) => {
    const newZoom = e.target.value;
    const center = canvasRef.current.getCenter();
    canvasRef.current.zoomToPoint({ x: center.left, y: center.top }, newZoom);
    setZoom(newZoom);
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
          onClick={() => {
            flip(canvasRef.current, history, dispatch);
          }}
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
        <FaRegSave
          className="h-6 w-6 cursor-pointer"
          onClick={() => {
            dispatch(saveCanvas(cardId, canvasRef, history));
          }}
        />
        <GrUndo
          onClick={() => {
            undo(canvasRef.current, history, dispatch);
          }}
          className="h-6 w-6 cursor-pointer"
        />
        <GrRedo
          onClick={() => {
            redo(canvasRef.current, history, dispatch);
          }}
          className="h-6 w-6 cursor-pointer"
        />
        <button
          className="bg-green-300 py-1 px-2"
          onClick={checkResult}
          type="button"
        >
          確認效果
        </button>
        <span className="bg-green-300 px-2 py-1">
          目前位置： {history.state.position}
        </span>
      </div>
    </div>
  );
}

export default BottomBar;
