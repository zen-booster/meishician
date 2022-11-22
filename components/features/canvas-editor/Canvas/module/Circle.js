import { useContext } from 'react';
import { fabric } from 'fabric';
import { fabricContext } from '../Canvas';
import { CIRCLE } from '../config/objectConfig';

function Circle() {
  const { canvasRef, setActiveObject } = useContext(fabricContext);

  const circle = new fabric.Circle({ ...CIRCLE });

  const addCircle = () => {
    canvasRef.current.centerObject(circle);
    canvasRef.current.add(circle);
    setActiveObject(circle);
  };

  return (
    <button className="h-full w-full" onClick={addCircle} type="button">
      圓形
    </button>
  );
}

export default Circle;
