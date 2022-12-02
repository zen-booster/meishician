import { useContext } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { fabricContext } from '../Canvas';
import { CIRCLE } from '../config/objectConfig';
import { SET_ACTIVE } from '../../../../constants/constants';

function Circle() {
  const { canvasRef } = useContext(fabricContext);
  const dispatch = useDispatch();

  const circle = new fabric.Circle({ ...CIRCLE });

  const addCircle = () => {
    canvasRef.current.centerObject(circle);
    canvasRef.current.add(circle);
    dispatch({ type: SET_ACTIVE, payload: circle });
  };

  return (
    <button className="h-full w-full" onClick={addCircle} type="button">
      圓形
    </button>
  );
}

export default Circle;
