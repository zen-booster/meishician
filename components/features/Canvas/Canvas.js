import { createContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import axios from 'axios';
import initCanvas from './initCanvas';
import TopBar from './TopBar';
import SideBar from './SideBar';
import BottomBar from './BottomBar';
import resizeCanvas from './service/resizeCanvas';
import serialize from './service/serialize';
import loadCanvas from './service/loadCanvas';
import { UPDATE } from '../../../constants/constants';
// import { DOMAIN_URL } from '../../../configs';
import { fetchCanvas } from '../../../store/actions';
import { DOMAIN_URL } from '../../../configs';

export const fabricContext = createContext();

function Canvas({ cardId }) {
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

    dispatch(fetchCanvas(cardId, canvasRef.current));

    // const auth = localStorage.getItem('auth');
    // axios.defaults.headers.common.Authorization = auth;
    // axios
    //   .get(`${DOMAIN_URL}/api/portfolio/${cardId}/canvas`)
    //   .then((res) => {
    //     const front = JSON.parse(res.data.data.canvasData.front);
    //     const back = JSON.parse(res.data.data.canvasData.back);
    //     const order = {
    //       orderName: 'init',
    //       dispatch,
    //       payload: { front, back },
    //     };
    //     console.log(front);
    //     loadCanvas(canvasRef.current, front, order);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

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
