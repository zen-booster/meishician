import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useWindowWide } from '../../../../../hooks/useWindowWide';
import { useWindowHeight } from '../../../../../hooks/useWindowHeight';
import { closeAll } from '../../../../../store/actions/manageActions';

function ShowCardModal() {
  const wide = useWindowWide();
  const height = useWindowHeight();
  const dispatch = useDispatch();
  const { activeCardImage, layoutDirection } = useSelector(
    (state) => state.manage.modal
  );

  const [ifRotate, setIfRotate] = useState(false);
  const [isCardFront, setIsCardFront] = useState(true);

  const cardImageSrc = isCardFront
    ? activeCardImage.front
    : activeCardImage.back;

  function handleSwitchCard() {
    if (!activeCardImage.back) return;
    setIsCardFront((prev) => !prev);
  }
  function handleCloseOpen() {
    dispatch(closeAll());
  }

  function sizeCalculate() {
    if (layoutDirection === 'vertical') {
      return [(height * 1) / 2, height, 250, 500];
    }
    if (ifRotate && layoutDirection === 'horizontal') {
      return [height * 0.7, (height * 1) / 2];
    }
    return [wide, (wide * 1) / 1.8, 800, 400];
  }

  const [cardWidth, cardHeight, maxWidth, maxHeight] = sizeCalculate();

  useEffect(() => {
    setIfRotate(!!(layoutDirection === 'horizontal' && wide <= 996));
  }, [wide]);

  return (
    <div className="fixed inset-0 z-30 ">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-80"
        onClick={() => {
          handleCloseOpen();
        }}
      />
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="flex items-center justify-center"
          style={{
            height: cardHeight,
            width: cardWidth,
          }}
        >
          {activeCardImage && (
            <div
              style={{
                height: cardHeight,
                width: cardWidth,
                maxWidth,
                maxHeight,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundImage: `url(${cardImageSrc})`,
                transform: `${ifRotate ? 'rotate(90deg) ' : 'rotate(0deg)'}`,
              }}
              onClick={handleSwitchCard}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowCardModal;
