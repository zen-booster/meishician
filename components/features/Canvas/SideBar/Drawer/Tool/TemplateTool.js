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
import { fabricContext } from '../../../Canvas';
import updateHistory from '../../../service/updateHistory';

function TemplateTool() {
  const canvasRef = useContext(fabricContext);
  const dispatch = useDispatch();
  const setTemplate = () => {
    updateHistory(canvasRef.current, dispatch);
    const { front, back } = hexTemplate;
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
    <ul className="flex flex-col items-center gap-10 py-4">
      <li className="w-44 cursor-pointer" onClick={setTemplate}>
        <Image src="/hex.png" width={972} height={540} alt="template" />
      </li>
    </ul>
  );
}

export default TemplateTool;
