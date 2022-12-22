import { useContext } from 'react';
import { fabric } from 'fabric-pure-browser';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { fabricContext } from '../Canvas';
import { CIRCLE } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Circle() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const circle = new fabric.Circle({ ...CIRCLE });

  const addCircle = () => {
    canvasRef.current.centerObject(circle);
    canvasRef.current.setActiveObject(circle);
    canvasRef.current.add(circle);
    canvasRef.current.renderAll();
    dispatch({ type: SET_ACTIVE, payload: circle });
  };

  return (
    <button onClick={addCircle} type="button">
      <Image src="/circle.svg" width={100} height={100} alt="circle" />
    </button>
  );
}

export default Circle;
