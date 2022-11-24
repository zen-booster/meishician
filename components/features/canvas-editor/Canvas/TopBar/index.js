import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdColorFill } from 'react-icons/io';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaTrashAlt,
} from 'react-icons/fa';
import { fabricContext } from '../Canvas';
import useForceUpdate from '../../../../../hooks/useForceUpdate';
import rotateCard from '../service/rotateCard';
import Modal from './Modal/Modal';
import serialize from '../service/serialize';
import { UPDATE, ROTATE } from '../../../../../constants/constants';

function TopBar() {
  const { canvasRef } = useContext(fabricContext);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();

  function updateHistory() {
    const serializedData = serialize(canvasRef.current);
    dispatch({
      type: UPDATE,
      payload: {
        newState: serializedData,
      },
    });
  }

  const changeColor = (e) => {
    activeObject.set('fill', e.target.value);
    canvasRef.current.renderAll();
    updateHistory();
    forceUpdate();
  };

  const changeSize = (e) => {
    activeObject.set('fontSize', e.target.value);
    canvasRef.current.renderAll();
    updateHistory();
    forceUpdate();
  };

  const removeObject = () => {
    canvasRef.current.remove(canvasRef.current.getActiveObject());
    updateHistory();
  };

  const textAlign = (e) => {
    activeObject.set('textAlign', e.target.value);
    canvasRef.current.renderAll();
    updateHistory();
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
    updateHistory();
    forceUpdate();
  };

  const toggleItalic = () => {
    const style = activeObject.fontStyle === 'normal' ? 'italic' : 'normal';
    activeObject.set('fontStyle', style);
    canvasRef.current.renderAll();
    updateHistory();
    forceUpdate();
  };

  const selectFont = (e) => {
    activeObject.set('fontFamily', e.target.value);
    canvasRef.current.renderAll();
    updateHistory();
    forceUpdate();
  };

  const toggleUnderline = () => {
    const toggle = activeObject.underline !== true;
    activeObject.set('underline', toggle);
    canvasRef.current.renderAll();
    updateHistory();
    forceUpdate();
  };

  const setBackward = () => {
    canvasRef.current.sendBackwards(activeObject);
    updateHistory();
  };

  const setForward = () => {
    canvasRef.current.bringForward(activeObject);
    updateHistory();
  };

  const rotate = () => {
    updateHistory();
    rotateCard(canvasRef.current);
    dispatch({ type: ROTATE });
  };

  return (
    <div className="flex w-full flex-1 items-center gap-4 bg-gray-500">
      {activeObject.get('type') !== 'image' && (
        <label className="relative ml-3 flex items-center">
          <IoMdColorFill
            className="h-6 w-6 rounded-full"
            style={{ color: `${activeObject.fill}` }}
          />
          <input
            className="absolute -z-10"
            type="color"
            value={activeObject.fill}
            onChange={changeColor}
          />
        </label>
      )}
      {activeObject.id === 'background' ? (
        <Modal action={rotate} title="改變方向" />
      ) : (
        <>
          <FaSortAmountDownAlt
            onClick={setBackward}
            className="h-6 w-6 cursor-pointer"
          />
          <FaSortAmountUpAlt
            onClick={setForward}
            className="h-6 w-6 cursor-pointer"
          />
          <FaTrashAlt
            onClick={removeObject}
            className="h-6 w-6 cursor-pointer"
          />
        </>
      )}
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
          <FaItalic onClick={toggleItalic} className="h-6 w-6 cursor-pointer" />
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
    </div>
  );
}

export default TopBar;
