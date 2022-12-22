import { useContext } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { fabricContext } from '../Canvas';
import { TEXTBOX } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Text({ content, size }) {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const text = new fabric.Textbox(content, { ...TEXTBOX, fontSize: size });

  function addText() {
    canvasRef.current.centerObject(text);
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
    canvasRef.current.renderAll();
    dispatch({ type: SET_ACTIVE, payload: text });
  }

  return (
    <button onClick={addText} className="h-full w-full text-left" type="button">
      {content}
    </button>
  );
}

export default Text;
