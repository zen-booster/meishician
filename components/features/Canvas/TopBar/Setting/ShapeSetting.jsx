import { useContext, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsBorderWidth } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import { fabricContext } from '../../Canvas';
import useClickOutside from '../../../../../hooks/useClickOutside';
import ShapeBorderModal from '../Modal/ShapeBorderModal';
import updateHistory from '../../service/updateHistory';
import 'tippy.js/dist/tippy.css';

const Tippy = dynamic(() => import('@tippyjs/react'), { ssr: false });
const SketchPicker = dynamic(() => import('react-color'), { ssr: false });

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
    if (!e) {
      setOpenPalette(false);
      activeObject.set('settingWidthColor', false);
      return;
    }
    activeObject.set('settingWidthColor', true);
    const isStrokeColor = e.target.getAttribute('name') === 'strokeColor';
    if (isStrokeColor) {
      setOpenPalette(!openPalette);
    }
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
        <Tippy content="邊框" placement="bottom">
          <button type="button" onClick={toggleModal} className="h-full w-full">
            <BsBorderWidth className="h-8 w-8 cursor-pointer" />
          </button>
        </Tippy>
        {showModal && <ShapeBorderModal />}
      </div>

      {activeObject.strokeWidth > 0 && (
        <Tippy content="邊框色" placement="bottom">
          <button
            type="button"
            name="strokeColor"
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
              onChangeComplete={() =>
                updateHistory(canvasRef.current, dispatch)
              }
            />
          </button>
        </Tippy>
      )}
    </div>
  );
}

export default ShapeSetting;
