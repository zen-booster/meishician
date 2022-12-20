import { useContext, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsBorderWidth } from 'react-icons/bs';
import { SketchPicker } from 'react-color';
import { fabricContext } from '../../Canvas';
import useClickOutside from '../../../../../hooks/useClickOutside';
import ShapeBorderModal from '../Modal/ShapeBorderModal';
import updateHistory from '../../service/updateHistory';

function ShapeSetting() {
  const canvasRef = useContext(fabricContext);
  const borderRef = useRef();
  const colorRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);
  const [objColor, setObjColor] = useState('#000000');
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  const toggleModal = (e) => {
    if (!e) return setShowModal(false);
    return setShowModal(!showModal);
  };

  const togglePalette = (e) => {
    if (!e) return setOpenPalette(false);
    if (e.target.nodeName === 'DIV') return undefined;
    if (e.target.nodeName === 'INPUT') return undefined;
    return setOpenPalette(!openPalette);
  };

  const setDefaultColor = () => {
    setObjColor(activeObject.stroke);
  };

  const setStrokeColor = (color) => {
    const { r, g, b, a } = color.rgb;
    const rgba = `rgba(${r},${g},${b},${a})`;
    setObjColor(rgba);
    activeObject.set('stroke', rgba);
    canvasRef.current.renderAll();
  };

  useClickOutside(borderRef, toggleModal);
  useClickOutside(colorRef, togglePalette);

  return (
    <div className="flex items-center gap-6">
      <div className="relative flex items-center" ref={borderRef}>
        <button type="button" onClick={toggleModal} className="h-full w-full">
          <BsBorderWidth className="h-8 w-8 cursor-pointer" />
        </button>
        {showModal && <ShapeBorderModal />}
      </div>

      {activeObject.strokeWidth > 0 && (
        <button
          type="button"
          className="relative flex h-full cursor-pointer flex-col items-center"
          ref={colorRef}
          onClick={(e) => {
            togglePalette(e);
            setDefaultColor();
          }}
        >
          <div
            className="pointer-events-none h-8 w-8 border-4"
            style={{
              backgroundColor: activeObject.fill,
              borderColor: activeObject.stroke,
            }}
          />
          <SketchPicker
            className={`absolute top-full left-0 ${!openPalette && 'hidden'}`}
            color={objColor}
            onChange={setStrokeColor}
            onChangeComplete={() => updateHistory(canvasRef.current, dispatch)}
          />
        </button>
      )}
    </div>
  );
}

export default ShapeSetting;
