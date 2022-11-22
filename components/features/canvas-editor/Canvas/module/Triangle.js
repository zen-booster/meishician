import { useContext } from 'react';
import { fabric } from 'fabric';
import { fabricContext } from '../Canvas';
import { TRIANGLE } from '../config/objectConfig';

function Triangle() {
  const { canvasRef, setActiveObject } = useContext(fabricContext);

  const triangle = new fabric.Triangle({ ...TRIANGLE });

  const addTriangle = () => {
    canvasRef.current.centerObject(triangle);
    canvasRef.current.add(triangle);
    setActiveObject(triangle);
  };

  return (
    <button className="h-full w-full" onClick={addTriangle} type="button">
      三角形
    </button>
  );
}

export default Triangle;
