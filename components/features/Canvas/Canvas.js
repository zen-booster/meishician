import { createContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initCanvas from './initCanvas';
import Space from '../../common/Space/Space';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import resizeCanvas from './service/resizeCanvas';
import serialize from './service/serialize';
import { UPDATE } from '../../../constants/constants';
import { fetchCanvas } from '../../../store/actions';
import keyPress from './service/keyPress';
import ChangeCardForm from '../change-card';

export const fabricContext = createContext();

function Canvas({ cardId }) {
  const canvasRef = useRef(null);
  const outerRef = useRef(null);
  const [pressKey, setPressKey] = useState({});
  const { activeObject } = useSelector((state) => state.canvasObject);
  const { history } = useSelector((state) => state);
  const { showInfoForm } = useSelector((state) => state.cardInfo);
  const dispatch = useDispatch();

  function updateHistory() {
    const serializedData = serialize(canvasRef.current);
    dispatch({
      type: UPDATE,
      payload: { newState: serializedData },
    });
  }

  // need history to update each time, so put the function outside the useEffect
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      keyPress(e, cardId, canvasRef, history, dispatch, pressKey);
      setPressKey((prev) => ({ ...prev, [e.key]: true }));
    };
    window.onkeyup = (e) =>
      setPressKey((prev) => {
        const copy = { ...prev };
        delete copy[e.key];
        return copy;
      });
  }

  useEffect(() => {
    const fabricCanvas = initCanvas(dispatch);
    canvasRef.current = fabricCanvas;

    // canvas size setting
    window.addEventListener('resize', () => {
      resizeCanvas(outerRef.current, canvasRef.current);
    });

    dispatch(fetchCanvas(cardId, canvasRef, outerRef));

    canvasRef.current.on('object:modified', updateHistory);
    canvasRef.current.on('object:added', updateHistory);

    return () => {
      canvasRef.current.dispose();
      window.onkeydown = null;
      window.onkeyup = null;
    };
  }, []);

  return (
    <fabricContext.Provider value={canvasRef}>
      <div className="flex h-screen flex-col">
        <Space />
        <div className="relative flex  h-full w-full">
          <SideBar />
          <div className="flex h-full w-full flex-col overflow-hidden">
            {activeObject && <TopBar />}

            <div
              className="flex flex-grow items-center justify-center bg-gray-01"
              ref={outerRef}
            >
              <canvas id="canvas" />
            </div>

            <BottomBar />
          </div>
        </div>
      </div>

      {showInfoForm && <ChangeCardForm />}
    </fabricContext.Provider>
  );
}

export default Canvas;
