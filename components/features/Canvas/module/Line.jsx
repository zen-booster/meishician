import { useContext } from 'react';
import { fabric } from 'fabric-pure-browser';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
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
    <button onClick={addLine} type="button" className="h-full w-full">
      <Image
        src="/line.svg"
        width={100}
        height={3}
        alt="line"
        className="mx-auto"
      />
    </button>
  );
}

export default Line;
