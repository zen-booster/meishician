import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import setLoadData from '../../../service/setLoadData';
import getBackground from '../../../service/getBackground';
import {
  NO_UPDATE,
  NEED_UPDATE,
  INITIALIZE,
  SET_ACTIVE,
} from '../../../../../../constants/constants';
import hexTemplate from '../../../template/hexTemplate';
import template1 from '../../../template/template1';
import template2 from '../../../template/template2';
import template3 from '../../../template/template3';
import template4 from '../../../template/template4';
import classic from '../../../template/classic';
import { fabricContext } from '../../../Canvas';
import updateHistory from '../../../service/updateHistory';

function TemplateTool() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();

  const setTemplate = (template) => {
    updateHistory(canvasRef.current, dispatch);
    const { front, back } = template;
    dispatch({ type: NO_UPDATE });
    const loadData = setLoadData(canvasRef.current, front);
    canvasRef.current.loadFromJSON(loadData, () => {
      dispatch({ type: NEED_UPDATE });
      dispatch({ type: INITIALIZE, payload: { front, back } });
      const background = getBackground(canvasRef.current);
      canvasRef.current.clipPath = background;
      canvasRef.current.renderAll();
      dispatch({ type: SET_ACTIVE, payload: background });
    });
  };

  return (
    <ul className="flex flex-col items-center gap-6 py-4">
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(hexTemplate)}
      >
        <Image src="/hex.png" width={972} height={540} alt="template" />
      </li>
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(template1)}
      >
        <Image
          src="/template/template.png"
          width={972}
          height={540}
          alt="template"
        />
      </li>
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(template2)}
      >
        <Image
          src="/template/template2.png"
          width={972}
          height={540}
          alt="template"
        />
      </li>
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(template3)}
      >
        <Image
          src="/template/template3.png"
          width={972}
          height={540}
          alt="template"
        />
      </li>
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(template4)}
      >
        <Image
          src="/template/template4.png"
          width={972}
          height={540}
          alt="template"
        />
      </li>
      <li
        className="w-44 cursor-pointer duration-200 ease-in hover:z-20 hover:scale-110"
        onClick={() => setTemplate(classic)}
      >
        <Image
          src="/template/classic.png"
          width={972}
          height={540}
          alt="template"
        />
      </li>
    </ul>
  );
}

export default TemplateTool;
