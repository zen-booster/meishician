import { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initCanvas from './initCanvas';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import resizeCanvas from './service/resizeCanvas';
import serialize from './service/serialize';
import loadCanvas from './service/loadCanvas';
import { UPDATE } from '../../../../constants/constants';

// temp data
import { horizonCard } from './config/defaultCard';

export const fabricContext = createContext();

function Canvas() {
  const canvasRef = useRef(null);
  const outerRef = useRef(null);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  function updateHistory() {
    const serializedData = serialize(canvasRef.current);
    dispatch({
      type: UPDATE,
      payload: {
        newState: serializedData,
      },
    });
  }

  useEffect(() => {
    const fabricCanvas = initCanvas(dispatch);
    canvasRef.current = fabricCanvas;

    window.addEventListener('resize', () => {
      resizeCanvas(outerRef.current, canvasRef.current);
    });
    resizeCanvas(outerRef.current, canvasRef.current);

    // get data to load (empty or something) (use default history to replace)
    const order = {
      orderName: 'init',
      dispatch,
      data: horizonCard,
    };
    loadCanvas(canvasRef.current, horizonCard.front, order);

    canvasRef.current.on('object:modified', updateHistory);
    canvasRef.current.on('object:added', updateHistory);

    return () => {
      canvasRef.current.dispose();
    };
  }, [dispatch]);

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
