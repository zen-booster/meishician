import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setFontSpace from '../../service/setFontSpace';
import setLineHeight from '../../service/setLineHeight';
import { fabricContext } from '../../Canvas';

function FontSpaceModal() {
  const canvasRef = useContext(fabricContext);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-full w-64 rounded-md bg-main-02 px-8 py-3 shadow-01">
      <div className="flex justify-between text-fs-6">
        <span>間距</span>
        <span>{activeObject.charSpacing / 100}</span>
      </div>
      <input
        type="range"
        className="w-full"
        min="0"
        max="3000"
        step={100}
        value={activeObject.charSpacing}
        onChange={(e) => {
          setFontSpace(e, canvasRef.current, activeObject, dispatch);
        }}
      />
      <div className="flex justify-between text-fs-6">
        <span>行寬</span>
        <span>{activeObject.lineHeight}</span>
      </div>
      <input
        type="range"
        className="w-full"
        min="1"
        max="3"
        step={0.01}
        value={activeObject.lineHeight}
        onChange={(e) => {
          setLineHeight(e, canvasRef.current, activeObject, dispatch);
        }}
      />
    </div>
  );
}

export default FontSpaceModal;
