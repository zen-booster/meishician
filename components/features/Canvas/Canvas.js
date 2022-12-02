import { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initCanvas from './initCanvas';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import resizeCanvas from './service/resizeCanvas';
import serialize from './service/serialize';
import { UPDATE } from '../../../constants/constants';
import { fetchCanvas } from '../../../store/actions';
import keyPress from './service/keyPress';

export const fabricContext = createContext();

function Canvas({ cardId }) {
  const canvasRef = useRef(null);
  const outerRef = useRef(null);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const { history } = useSelector((state) => state);
  const dispatch = useDispatch();

  function updateHistory() {
    const serializedData = serialize(canvasRef.current);
    dispatch({
      type: UPDATE,
      payload: { newState: serializedData },
    });
  }

  useEffect(() => {
    const fabricCanvas = initCanvas(dispatch);
    canvasRef.current = fabricCanvas;

    // canvas size setting
    window.addEventListener('resize', () => {
      resizeCanvas(outerRef.current, canvasRef.current);
    });
    resizeCanvas(outerRef.current, canvasRef.current);

    dispatch(fetchCanvas(cardId, canvasRef));

    canvasRef.current.on('object:modified', updateHistory);
    canvasRef.current.on('object:added', updateHistory);

    return () => {
      canvasRef.current.dispose();
    };
  }, []);

  // key press event
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      keyPress(e, cardId, canvasRef, activeObject, history, dispatch);
    };
  }

  return (
    <fabricContext.Provider value={{ canvasRef }}>
      <div className="-mt-16 flex h-screen flex-col">
        <div className="pt-16" />
        <div className="relative flex h-full w-full">
          <SideBar />
          <div className="z-10 flex h-full w-full flex-col overflow-hidden">
            {activeObject && <TopBar />}

            <div
              className="flex h-5/6 items-center justify-center bg-gray-400"
              ref={outerRef}
            >
              <canvas id="canvas" />
            </div>

            <BottomBar />
          </div>
        </div>
      </div>
    </fabricContext.Provider>
  );
}

export default Canvas;
