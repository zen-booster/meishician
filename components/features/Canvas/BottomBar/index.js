import { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import { fabricContext } from '../Canvas';
import flip from '../service/flip';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import { ROTATE } from '../../../../constants/constants';
import rotateCard from '../service/rotateCard';
import updateHistory from '../service/updateHistory';

function BottomBar() {
  const canvasRef = useContext(fabricContext);
  const [zoom, setZoom] = useState(1);
  const [showWarn, setShowWarn] = useState(false);
  const { history } = useSelector((state) => state);
  const dispatch = useDispatch();

  const rotate = () => {
    updateHistory(canvasRef.current, dispatch);
    rotateCard(canvasRef.current);
    dispatch({ type: ROTATE });
    setShowWarn(false);
  };

  const changeZoom = (e) => {
    const newZoom = e.target.value;
    const center = canvasRef.current.getCenter();
    canvasRef.current.zoomToPoint({ x: center.left, y: center.top }, newZoom);
    canvasRef.current.renderAll();
    setZoom(newZoom);
  };

  return (
    <>
      <div className=" flex h-16 items-center justify-between bg-gray-02 px-6 text-rwd-body text-main-01">
        <div className="flex  items-center gap-5">
          <button
            type="button"
            className="flex flex-col items-center justify-center"
            onClick={() => {
              setShowWarn(!showWarn);
            }}
          >
            <Image src="/rotate.svg" width={32} height={33} alt="rotate" />
            <p>旋轉名片</p>
          </button>
          <button
            type="button"
            className="flex flex-col items-center justify-center"
            onClick={() => {
              flip(canvasRef.current, history, dispatch);
            }}
          >
            <Image src="/flip.svg" width={32} height={32} alt="rotate" />
            <p>名片翻面</p>
          </button>
        </div>

        <span className="rounded-xl bg-main-01 px-2 py-1 text-body font-bold text-white">
          目前位置： {history.state.position === 'front' ? '正面' : '背面'}
        </span>

        <div className="flex flex-col items-center">
          <input
            type="range"
            max={2}
            min={0.01}
            step={0.01}
            value={zoom}
            onChange={changeZoom}
          />
          <p className="text-label text-black">{Math.round(zoom * 100)} %</p>
        </div>
      </div>

      {showWarn && (
        <Modal show={setShowWarn}>
          <div className="flex flex-col items-center font-bold text-main-01">
            <Image
              src="/warn.svg"
              width={180}
              height={221}
              alt="warning"
              className="mb-9"
            />
            <p className="mb-6 text-h4">確定要更改尺寸？</p>
            <p className="mb-10 text-fs-6">畫布內容將會重製</p>
            <div className="flex gap-12 text-fs-6">
              <Button className="w-36 bg-danger" onClick={rotate}>
                確定旋轉
              </Button>
              <Button
                variant="outlined"
                className="w-36 bg-white"
                onClick={() => {
                  setShowWarn(false);
                }}
              >
                取消
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default BottomBar;
