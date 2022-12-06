import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa';
import { MdOutlineFormatLineSpacing } from 'react-icons/md';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import fonts from '../../../../../data/fontData';
import selectFont from '../../service/selectFont';
import setFontSize from '../../service/setFontSize';
import setTextAlign from '../../service/setTextAlign';
import setFontSpace from '../../service/setFontSpace';
import toggleBold from '../../service/toggleBold';
import toggleItalic from '../../service/toggleItalic';
import toggleUnderline from '../../service/toggleUnderline';
import { fabricContext } from '../../Canvas';

function TextSetting() {
  const canvasRef = useContext(fabricContext);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

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

      <FaBold
        onClick={() => toggleBold(canvasRef.current, activeObject, dispatch)}
        className="h-6 w-6 cursor-pointer"
      />
      <FaItalic
        onClick={() => toggleItalic(canvasRef.current, activeObject, dispatch)}
        className="h-6 w-6 cursor-pointer"
      />
      <FaUnderline
        onClick={() =>
          toggleUnderline(canvasRef.current, activeObject, dispatch)
        }
        className="h-6 w-6 cursor-pointer"
      />

      <div className="relative">
        <MdOutlineFormatLineSpacing className="h-6 w-6 cursor-pointer" />
        <div className="absolute top-full rounded-lg bg-main-02 px-3 py-2">
          <div className="flex justify-between">
            <span>間距</span>
            <span>{activeObject.charSpacing / 100}</span>
          </div>
          <input
            type="range"
            min="0"
            max="3000"
            step={100}
            value={activeObject.charSpacing}
            onChange={(e) => {
              setFontSpace(e, canvasRef.current, activeObject, dispatch);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TextSetting;
