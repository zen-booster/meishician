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
import isShape from '../service/isShape';
import isAllText from '../service/isAllText';
import saveCanvas from '../service/saveCanvas';
import updateHistory from '../service/updateHistory';

import WarnModal from './Modal/WarnModal';
import TextSetting from './Setting/TextSetting';
import ShapeSetting from './Setting/ShapeSetting';
import useClickOutside from '../../../../hooks/useClickOutside';
import { SHOW_INFO_FROM } from '../../../../constants/constants';
import 'tippy.js/dist/tippy.css';

const Tippy = dynamic(() => import('@tippyjs/react'), { ssr: false });
const SketchPicker = dynamic(() => import('react-color'), { ssr: false });

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

  const type = activeObject.get('type');

  const togglePalette = (e) => {
    if (!e) {
      setOpenPalette(false);
      activeObject.set('settingColor', false);
      return;
    }
    activeObject.set('settingColor', true);
    const isMainColor = e.target.getAttribute('name') === 'mainColor';
    if (isMainColor) {
      setOpenPalette(!openPalette);
    }
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
        <div className="flex h-full shrink-0 gap-6">
          <Tippy content="主色" placement="bottom">
            <button
              type="button"
              className="relative flex h-full cursor-pointer flex-col items-center"
              name="mainColor"
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
              <SketchPicker
                className={`absolute top-full left-0 ${
                  !openPalette && 'hidden'
                }`}
                color={objColor}
                onChange={(color) =>
                  changeColor(
                    color,
                    canvasRef.current,
                    activeObject,
                    setObjColor
                  )
                }
                onChangeComplete={() =>
                  updateHistory(canvasRef.current, dispatch)
                }
              />
            </button>
          </Tippy>

          <Tippy content="上一步" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="還原" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="上移" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="下移" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="旋轉" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="固定" placement="bottom">
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
            </button>
          </Tippy>

          <Tippy content="刪除" placement="bottom">
            <button
              type="button"
              className="flex h-full flex-col items-center"
              onClick={() =>
                removeObject(canvasRef.current, activeObject, dispatch)
              }
            >
              <Image
                src="/trash-bin.svg"
                width={25}
                height={31}
                alt="delete"
                className="my-auto"
              />
            </button>
          </Tippy>
          <div className="my-auto h-12 w-0.5 bg-gray-01" />
        </div>

        {type === 'textbox' && <TextSetting />}
        {isAllText(activeObject) && <TextSetting />}
        {isShape(activeObject) && <ShapeSetting />}

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
