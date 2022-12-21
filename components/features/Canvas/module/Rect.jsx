import { useContext } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { fabricContext } from '../Canvas';
import { RECTANGLE } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Rectangle() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const rectangle = new fabric.Rect({ ...RECTANGLE });

  const addRectangle = () => {
    canvasRef.current.centerObject(rectangle);
    canvasRef.current.setActiveObject(rectangle);
    canvasRef.current.add(rectangle);
    canvasRef.current.renderAll();
    dispatch({ type: SET_ACTIVE, payload: rectangle });
  };

  return (
    <button onClick={addRectangle} type="button">
      <Image src="/rectangle.svg" width={100} height={100} alt="rectangle" />
    </button>
  );
}

export default Rectangle;
