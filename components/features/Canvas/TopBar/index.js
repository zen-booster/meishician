import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaBold, FaItalic, FaUnderline, FaTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';
import { fabricContext } from '../Canvas';
import useForceUpdate from '../../../../hooks/useForceUpdate';
import updateHistory from '../service/updateHistory';
import removeObject from '../service/removeObject';
import { saveCanvas, publishCanvas } from '../../../../store/actions';
import undo from '../service/undo';
import redo from '../service/redo';
import toImage from '../service/toImage';
import getBackground from '../service/getBackground';

function TopBar() {
  const router = useRouter();
  const canvasRef = useContext(fabricContext);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const { history } = useSelector((state) => state);
  const [showWarn, setShowWarn] = useState(false);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const { cardId } = router.query;

  const changeColor = (e) => {
    activeObject.set('fill', e.target.value);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const lock = () => {
    const { lockMovementX, lockMovementY, evented } = activeObject;
    activeObject.set('lockMovementX', !lockMovementX);
    activeObject.set('lockMovementY', !lockMovementY);
    activeObject.set('evented', !evented);
    canvasRef.current.renderAll();
  };

  const rotateObj = () => {
    const { angle } = activeObject;
    activeObject.set('angle', angle + 90);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
  };

  const changeSize = (e) => {
    activeObject.set('fontSize', e.target.value);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const textAlign = (e) => {
    activeObject.set('textAlign', e.target.value);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();

    // both needed
    // when not select, change it will cause the bug to cancel
    // activeObject.enterEditing();
    // activeObject.hiddenTextarea.focus();
  };

  const toggleBold = () => {
    const weight = activeObject.fontWeight === 'normal' ? 'bold' : 'normal';
    activeObject.set('fontWeight', weight);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const toggleItalic = () => {
    const style = activeObject.fontStyle === 'normal' ? 'italic' : 'normal';
    activeObject.set('fontStyle', style);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const selectFont = (e) => {
    activeObject.set('fontFamily', e.target.value);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const toggleUnderline = () => {
    const toggle = activeObject.underline !== true;
    activeObject.set('underline', toggle);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
    forceUpdate();
  };

  const setBackward = () => {
    const position = canvasRef.current.getObjects().indexOf(activeObject);
    if (position === 1) return;
    canvasRef.current.sendBackwards(activeObject);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
  };

  const setForward = () => {
    canvasRef.current.bringForward(activeObject);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
  };

  const preview = () => {
    const background = getBackground(canvasRef.current);
    const previewImage = toImage(canvasRef.current, background);
    console.log(previewImage);
  };

  const save = () => {
    dispatch(saveCanvas(cardId, canvasRef, history));
  };

  const publish = () => {
    dispatch(publishCanvas(cardId, canvasRef, history));
    setShowWarn(false);
  };

  return (
    <>
      <div className="z-10 flex w-full items-center justify-between gap-4 bg-gray-02 py-1.5 pl-7 pr-10 text-rwd-body text-main-01 shadow-01">
        <div className="flex h-full gap-6">
          <label className="relative flex h-full cursor-pointer flex-col items-center">
            <Image
              src="/palette.svg"
              width={32}
              height={32}
              alt="palette"
              className="my-auto"
            />
            <span>顏色</span>
            <input
              className="invisible absolute bottom-0"
              type="color"
              value={activeObject.fill}
              onChange={changeColor}
            />
          </label>

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
            onClick={setForward}
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
            onClick={setBackward}
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
          <div className="my-auto h-12 w-0.5 bg-gray-01" />
        </div>

        <FaTrashAlt
          onClick={() => {
            removeObject(canvasRef.current, dispatch);
          }}
          className="h-6 w-6 cursor-pointer"
        />

        <Image
          src="/lock.svg"
          width={24}
          height={32}
          alt="lock"
          className="cursor-pointer"
          onClick={lock}
        />

        <Image
          src="/rotate-object.svg"
          width={24}
          height={30}
          alt="lock"
          className="cursor-pointer"
          onClick={rotateObj}
        />

        {activeObject.get('type') === 'textbox' && (
          <>
            <input
              type="number"
              className="w-16 text-center"
              value={activeObject.fontSize}
              onChange={changeSize}
            />
            <select onChange={textAlign} value={activeObject.textAlign}>
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
              <option value="justify">justify</option>
            </select>
            <FaBold onClick={toggleBold} className="h-6 w-6 cursor-pointer" />
            <FaItalic
              onClick={toggleItalic}
              className="h-6 w-6 cursor-pointer"
            />
            <FaUnderline
              onClick={toggleUnderline}
              className="h-6 w-6 cursor-pointer"
            />
            <select onChange={selectFont} value={activeObject.fontFamily}>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Poppins">Poppins</option>
              <option value="Noto Sans TC">Noto Sans TC</option>
              <option value="Noto Serif TC">Noto Serif TC</option>
              <option value="Xanh Mono">Xanh Mono</option>
            </select>
          </>
        )}
        <div className="flex gap-7">
          <button type="button" onClick={preview}>
            預覽
          </button>
          <button type="button" onClick={save}>
            儲存
          </button>
          <button
            type="button"
            className="w-[7.5rem] rounded-xl bg-main-02 px-5 py-2 text-rwd-h5 font-bold"
            onClick={() => {
              setShowWarn(true);
            }}
          >
            發布名片
          </button>
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
            <p className="mb-6 text-h4">準備發布名片了嗎？</p>
            <p className="mb-10 text-fs-6">畫布內容將會重製</p>
            <div className="flex gap-12 text-fs-6">
              <Button className="w-36 bg-main-01" onClick={publish}>
                確定發布
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

export default TopBar;
