import { useContext } from 'react';
import { fabric } from 'fabric';
import { fabricContext } from '../Canvas';
import { TEXTBOX } from '../config/objectConfig';

function Text({ content, size }) {
  const { canvasRef, setActiveObject } = useContext(fabricContext);
  const text = new fabric.Textbox(content, { ...TEXTBOX, fontSize: size });

  function addText() {
    canvasRef.current.centerObject(text);
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
    setActiveObject(text);
  }

  return (
    <button onClick={addText} className="h-full w-full" type="button">
      {content}
    </button>
  );
}

export default Text;
