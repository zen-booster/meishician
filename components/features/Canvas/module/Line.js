import { useContext } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { fabricContext } from '../Canvas';
import { LINE } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Line() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const line = new fabric.Line(LINE.coords, { ...LINE.options });

  const addLine = () => {
    canvasRef.current.centerObject(line);
    canvasRef.current.setActiveObject(line);
    canvasRef.current.add(line);
    canvasRef.current.renderAll();
    dispatch({ type: SET_ACTIVE, payload: line });
  };

  return (
    <button className="h-full w-full" onClick={addLine} type="button">
      線條
    </button>
  );
}

export default Line;
