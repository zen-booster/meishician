import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import loadCanvas from '../../../service/loadCanvas';
import { NO_UPDATE } from '../../../../../../constants/constants';
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
    const order = {
      orderName: 'init',
      dispatch,
      payload: { front, back },
    };
    loadCanvas(canvasRef.current, front, order);
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
