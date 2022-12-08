import { useContext } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { fabricContext } from '../Canvas';
import { TRIANGLE } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Triangle() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const triangle = new fabric.Triangle({ ...TRIANGLE });

  const addTriangle = () => {
    canvasRef.current.centerObject(triangle);
    canvasRef.current.setActiveObject(triangle);
    canvasRef.current.add(triangle);
    canvasRef.current.renderAll();
    dispatch({ type: SET_ACTIVE, payload: triangle });
  };

  return (
    <button onClick={addTriangle} type="button">
      <Image src="/triangle.svg" width={367} height={317} alt="triangle" />
    </button>
  );
}

export default Triangle;
