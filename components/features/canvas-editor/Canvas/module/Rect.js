import { useContext } from 'react';
import { fabric } from 'fabric';
import { fabricContext } from '../Canvas';
import { RECTANGLE } from '../config/objectConfig';

function Rectangle() {
  const { canvasRef, setActiveObject } = useContext(fabricContext);

  const rectangle = new fabric.Rect({ ...RECTANGLE });

  const addRectangle = () => {
    canvasRef.current.centerObject(rectangle);
    canvasRef.current.add(rectangle);
    setActiveObject(rectangle);
  };

  return (
    <button className="h-full w-full" onClick={addRectangle} type="button">
      方形
    </button>
  );
}

export default Rectangle;
