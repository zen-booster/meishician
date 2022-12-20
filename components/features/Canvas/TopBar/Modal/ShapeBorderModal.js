import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fabricContext } from '../../Canvas';
import updateHistory from '../../service/updateHistory';

function ShapeBorderModal() {
  const canvasRef = useContext(fabricContext);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  const setStrokeWidth = (e) => {
    if (activeObject.id === 'background') return;
    activeObject.set('strokeWidth', parseInt(e.target.value, 10));
    activeObject.set('strokeUniform', true);
    canvasRef.current.renderAll();
    updateHistory(canvasRef.current, dispatch);
  };

  return (
    <div className="absolute top-full w-64 rounded-md bg-main-02 px-4 py-3 shadow-01">
      <div className="flex justify-between gap-2 text-fs-6">
        <span className="shrink-0">邊框</span>
        <input
          type="range"
          className="w-full"
          min={0}
          max={10}
          step={1}
          value={activeObject.strokeWidth}
          onChange={setStrokeWidth}
        />
        <span>{activeObject.strokeWidth}</span>
      </div>
    </div>
  );
}

export default ShapeBorderModal;
