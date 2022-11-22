import { useContext } from 'react';
import { fabric } from 'fabric';
import { fabricContext } from '../Canvas';
import { LINE } from '../config/objectConfig';

function Line() {
  const { canvasRef, setActiveObject } = useContext(fabricContext);

  const line = new fabric.Line(LINE.coords, { ...LINE.options });

  const addLine = () => {
    canvasRef.current.centerObject(line);
    canvasRef.current.add(line);
    setActiveObject(line);
  };

  return (
    <button className="h-full w-full" onClick={addLine} type="button">
      線條
    </button>
  );
}

export default Line;
