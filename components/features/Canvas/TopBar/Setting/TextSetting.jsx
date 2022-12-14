import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';
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
import 'tippy.js/dist/tippy.css';
// import Tippy from '@tippyjs/react';
const Tippy = dynamic(() => import('@tippyjs/react'), {
  ssr: false,
});

function TextSetting() {
  const canvasRef = useContext(fabricContext);
  const spaceRef = useRef();
  const fontSizeRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  const toggleModal = (e) => {
    if (!e) return setShowModal(false);
    return setShowModal(!showModal);
  };

  const setEditing = (e) => {
    if (!e) return activeObject.set('settingText', false);
    return activeObject.set('settingText', true);
  };

  useClickOutside(spaceRef, toggleModal);
  useClickOutside(fontSizeRef, setEditing);

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
          <option
            value={font.value}
            key={font.value}
            style={{ fontFamily: font.value }}
          >
            {font.name}
          </option>
        ))}
      </select>

      {activeObject.get('type') !== 'activeSelection' && (
        <input
          type="number"
          ref={fontSizeRef}
          className="w-16 rounded-md text-center"
          min={1}
          value={activeObject.fontSize}
          onChange={(e) =>
            setFontSize(e, canvasRef.current, activeObject, dispatch)
          }
          onClick={setEditing}
        />
      )}

      {activeObject.get('type') !== 'activeSelection' && (
        <Tippy content="??????" placement="bottom">
          <button
            type="button"
            onClick={() =>
              setTextAlign(canvasRef.current, activeObject, dispatch)
            }
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
        </Tippy>
      )}

      <Tippy content="??????" placement="bottom">
        <button
          type="button"
          onClick={() => toggleBold(canvasRef.current, activeObject, dispatch)}
        >
          <FaBold className="h-6 w-6 cursor-pointer" />
        </button>
      </Tippy>

      <Tippy content="??????" placement="bottom">
        <button
          type="button"
          onClick={() =>
            toggleItalic(canvasRef.current, activeObject, dispatch)
          }
        >
          <FaItalic className="h-6 w-6 cursor-pointer" />
        </button>
      </Tippy>

      <Tippy content="??????" placement="bottom">
        <button
          type="button"
          onClick={() =>
            toggleUnderline(canvasRef.current, activeObject, dispatch)
          }
        >
          <FaUnderline className="h-6 w-6 cursor-pointer" />
        </button>
      </Tippy>

      {activeObject.get('type') !== 'activeSelection' && (
        <div className="relative" ref={spaceRef}>
          <Tippy content="??????" placement="bottom">
            <button
              type="button"
              onClick={toggleModal}
              className="h-full w-full"
            >
              <MdOutlineFormatLineSpacing className="h-8 w-8 cursor-pointer" />
            </button>
          </Tippy>
          {showModal && <FontSpaceModal />}
        </div>
      )}
    </div>
  );
}

export default TextSetting;
