import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import initCanvas from './initCanvas';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar/BottomBar';
import resizeCanvas from './service/resizeCanvas';
import saveCanvas from './service/saveCanvas';
import { INITIALIZE, UPDATE } from '../../../../constants/constants';

export const fabricContext = React.createContext();

function Canvas() {
  const canvasRef = useRef(null);
  const outerRef = useRef(null);
  const { activeObject } = useSelector((state) => state.canvasObject);
  const dispatch = useDispatch();

  useEffect(() => {
    const fabricCanvas = initCanvas(dispatch);
    canvasRef.current = fabricCanvas;

    window.addEventListener('resize', () => {
      resizeCanvas(outerRef.current, canvasRef.current);
    });
    resizeCanvas(outerRef.current, canvasRef.current);

    dispatch({
      type: INITIALIZE,
      payload: {
        initState: saveCanvas(canvasRef.current),
      },
    });

    canvasRef.current.on('object:modified', () => {
      dispatch({
        type: UPDATE,
        payload: {
          newState: saveCanvas(canvasRef.current),
        },
      });
    });

    canvasRef.current.on('object:added', () => {
      dispatch({
        type: UPDATE,
        payload: {
          newState: saveCanvas(canvasRef.current),
        },
      });
    });

    return () => {
      canvasRef.current.dispose();
    };
  }, [dispatch]);

  return (
    <fabricContext.Provider value={{ canvasRef }}>
      <div className="-mt-16 flex h-screen flex-col">
        <div className="pt-16" />
        <div className="flex h-full w-full">
          <SideBar />
          <div className="z-10 flex h-full w-full flex-col">
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
