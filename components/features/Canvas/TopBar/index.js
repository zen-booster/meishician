import { useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { fabricContext } from '../Canvas';
import removeObject from '../service/removeObject';
import changeColor from '../service/changeColor';
import rotateObject from '../service/rotateObject';
import setBackward from '../service/setBackward';
import setForward from '../service/setForward';
import lockObject from '../service/lockObject';
import undo from '../service/undo';
import redo from '../service/redo';
import WarnModal from './Modal/WarnModal';
import TextSetting from './Setting/TextSetting';
import ShapeSetting from './Setting/ShapeSetting';
import saveCanvas from '../service/saveCanvas';
import useClickOutside from '../../../../hooks/useClickOutside';
import { SHOW_INFO_FROM } from '../../../../constants/constants';
import updateHistory from '../service/updateHistory';
// import { SketchPicker } from 'react-color';
const SketchPicker = dynamic(() => import('react-color'), {
  ssr: false,
});

function TopBar() {
  const router = useRouter();
  const canvasRef = useContext(fabricContext);
  const colorRef = useRef(null);
  const [openPalette, setOpenPalette] = useState(false);
  const [objColor, setObjColor] = useState('#ffffff');
  const { activeObject } = useSelector((state) => state.canvasObject);
  const { history } = useSelector((state) => state);
  const { isPublished } = useSelector((state) => state.cardInfo);
  const [showWarn, setShowWarn] = useState(false);
  const dispatch = useDispatch();
  const { cardId } = router.query;

  const togglePalette = (e) => {
    if (!e) return setOpenPalette(false);
    if (e.target.nodeName === 'DIV') return undefined;
    if (e.target.nodeName === 'INPUT') return undefined;
    return setOpenPalette(!openPalette);
  };

  const setDefaultColor = () => {
    if (activeObject.isType('line')) {
      setObjColor(activeObject.stroke);
    } else {
      setObjColor(activeObject.fill);
    }
  };

  useClickOutside(colorRef, togglePalette);

  return (
    <>
      <div className="z-10 flex w-full items-center gap-4 bg-gray-02 py-1.5 pl-7 pr-10 text-rwd-body text-main-01 shadow-01">
        <div className="flex h-full gap-6">
          <button
            type="button"
            className="relative flex h-full cursor-pointer flex-col items-center"
            ref={colorRef}
            onClick={(e) => {
              togglePalette(e);
              setDefaultColor();
            }}
          >
            <Image
              src="/palette.svg"
              width={32}
              height={32}
              alt="palette"
              className="pointer-events-none my-auto"
            />
            <span className="pointer-events-none">顏色</span>
            <SketchPicker
              className={`absolute top-full left-0 ${!openPalette && 'hidden'}`}
              color={objColor}
              onChange={(color) =>
                changeColor(color, canvasRef.current, activeObject, setObjColor)
              }
              onChangeComplete={() =>
                updateHistory(canvasRef.current, dispatch)
              }
            />
          </button>

          <button
            className="flex h-full flex-col items-center"
            type="button"
            onClick={() => {
              undo(canvasRef.current, history, dispatch);
            }}
          >
            <Image
              src="/undo.svg"
              width={40}
              height={18}
              alt="undo"
              className="my-auto"
            />
            <p>上一步</p>
          </button>
          <button
            className="flex h-full flex-col items-center"
            type="button"
            onClick={() => {
              redo(canvasRef.current, history, dispatch);
            }}
          >
            <Image
              src="/redo.svg"
              width={40}
              height={18}
              alt="redo"
              className="my-auto"
            />
            <p>還原</p>
          </button>

          <button
            type="button"
            className="flex h-full flex-col items-center"
            onClick={() => {
              setForward(canvasRef.current, activeObject, dispatch);
            }}
          >
            <Image
              src="/set-front.svg"
              width={20}
              height={31}
              alt="set-front"
              className="my-auto"
            />
            上移
          </button>
          <button
            type="button"
            className="flex h-full flex-col items-center"
            onClick={() => {
              setBackward(canvasRef.current, activeObject, dispatch);
            }}
          >
            <Image
              src="/set-back.svg"
              width={20}
              height={32}
              alt="set-back"
              className="my-auto"
            />
            下移
          </button>
          <button
            type="button"
            className="flex h-full flex-col items-center"
            onClick={(e) => {
              rotateObject(e, canvasRef.current, activeObject, dispatch);
            }}
          >
            <Image
              src="/rotate-object.svg"
              width={24}
              height={30}
              alt="rotate-object"
              className="my-auto"
            />
            旋轉
          </button>
          <button
            type="button"
            className="flex h-full flex-col items-center"
            onClick={() => {
              lockObject(canvasRef.current, activeObject, dispatch);
            }}
          >
            <Image
              src="/lock.svg"
              width={24}
              height={32}
              alt="lock"
              className="my-auto"
            />
            固定
          </button>
          <button
            type="button"
            className="flex h-full flex-col items-center"
            onClick={() => removeObject(canvasRef.current, dispatch)}
          >
            <Image
              src="/trash-bin.svg"
              width={25}
              height={31}
              alt="delete"
              className="my-auto"
            />
            刪除
          </button>
          <div className="my-auto h-12 w-0.5 bg-gray-01" />
        </div>

        {activeObject.get('type') === 'textbox' && <TextSetting />}
        {activeObject.get('type') === 'circle' && <ShapeSetting />}
        {activeObject.get('type') === 'rect' &&
          activeObject.id !== 'background' && <ShapeSetting />}
        {activeObject.get('type') === 'triangle' && <ShapeSetting />}

        <div className="ml-auto flex gap-7">
          <button
            type="button"
            onClick={() => {
              saveCanvas(cardId, canvasRef, history, dispatch);
            }}
          >
            儲存
          </button>
          {isPublished && (
            <button
              type="button"
              className="w-[7.5rem] rounded-xl bg-main-02 px-5 py-2 text-rwd-h5 font-bold"
              onClick={() => dispatch({ type: SHOW_INFO_FROM })}
            >
              修改資訊
            </button>
          )}
          {!isPublished && (
            <button
              type="button"
              className="w-[7.5rem] rounded-xl bg-main-02 px-5 py-2 text-rwd-h5 font-bold"
              onClick={() => setShowWarn(true)}
            >
              發布名片
            </button>
          )}
        </div>
      </div>

      {showWarn && <WarnModal setShowWarn={setShowWarn} />}
    </>
  );
}

export default TopBar;
