import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';
import { MdOutlineFormatLineSpacing } from 'react-icons/md';
import { useContext, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fonts from '../../../../../data/fontData';
import selectFont from '../../service/selectFont';
import setFontSize from '../../service/setFontSize';
import setTextAlign from '../../service/setTextAlign';
import toggleBold from '../../service/toggleBold';
import toggleItalic from '../../service/toggleItalic';
import toggleUnderline from '../../service/toggleUnderline';
import { fabricContext } from '../../Canvas';
import FontSpaceModal from '../Modal/FontSpaceModal';
import useClickOutside from '../../../../../hooks/useClickOutside';

function TextSetting() {
  const canvasRef = useContext(fabricContext);
  const clickRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  const toggleModal = (e) => {
    if (!e) return setShowModal(false);
    return setShowModal(!showModal);
  };

  useClickOutside(clickRef, toggleModal);

  return (
    <div className="flex gap-6">
      <select
        onChange={(e) =>
          selectFont(e, canvasRef.current, activeObject, dispatch)
        }
        value={activeObject.fontFamily}
        className="rounded-md bg-white px-2 py-1"
      >
        {fonts.map((font) => (
          <option value={font} key={font}>
            {font}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="w-16 rounded-md text-center"
        value={activeObject.fontSize}
        onChange={(e) =>
          setFontSize(e, canvasRef.current, activeObject, dispatch)
        }
      />

      <button
        type="button"
        onClick={() => setTextAlign(canvasRef.current, activeObject, dispatch)}
      >
        {activeObject.textAlign === 'left' && (
          <FaAlignLeft className="h-6 w-6 cursor-pointer" />
        )}
        {activeObject.textAlign === 'center' && (
          <FaAlignCenter className="h-6 w-6 cursor-pointer" />
        )}
        {activeObject.textAlign === 'right' && (
          <FaAlignRight className="h-6 w-6 cursor-pointer" />
        )}
      </button>

      <button
        type="button"
        onClick={() => toggleBold(canvasRef.current, activeObject, dispatch)}
      >
        <FaBold className="h-6 w-6 cursor-pointer" />
      </button>

      <button
        type="button"
        onClick={() => toggleItalic(canvasRef.current, activeObject, dispatch)}
      >
        <FaItalic className="h-6 w-6 cursor-pointer" />
      </button>

      <button
        type="button"
        onClick={() =>
          toggleUnderline(canvasRef.current, activeObject, dispatch)
        }
      >
        <FaUnderline className="h-6 w-6 cursor-pointer" />
      </button>

      <div className="relative" ref={clickRef}>
        <button type="button" onClick={toggleModal} className="h-full w-full">
          <MdOutlineFormatLineSpacing className="h-8 w-8 cursor-pointer" />
        </button>
        {showModal && <FontSpaceModal />}
      </div>
    </div>
  );
}

export default TextSetting;
