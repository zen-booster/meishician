import { useDispatch, useSelector } from 'react-redux';
// import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useWindowWide } from '../../../../../hooks/useWindowWide';

import { closeAll } from '../../../../../store/actions/manageActions';

function ShowCardModal() {
  const wide = useWindowWide();
  const dispatch = useDispatch();
  const { activeCardImage, layoutDirection } = useSelector(
    (state) => state.manage.modal
  );

  const [ifRotate, setIfRotate] = useState(false);
  function handleCloseOpen() {
    dispatch(closeAll());
  }
  console.log('layout', layoutDirection);

  useEffect(() => {
    setIfRotate(!!(layoutDirection === 'horizontal' && wide <= 996));
  }, [wide]);

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => {
          handleCloseOpen();
        }}
      />
      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto rounded-xl bg-main-02 px-10 py-8 shadow-lg">
          {activeCardImage && (
            <div
              style={{
                height: 700,
                width: 350,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundImage: `url(${activeCardImage.front})`,
                transform: `${ifRotate ? 'rotate(90deg)' : 'rotate(0deg)'}`,
              }}
            />
            // <Image
            //   src={activeCardImage.front}
            //   width="200"
            //   height="100"
            //   className="min-w-[300px]"
            //   style={{
            //     transform: `${ifRotate ? 'rotate(90deg)' : 'rotate(0deg)'}`,
            //   }}
            // />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowCardModal;
