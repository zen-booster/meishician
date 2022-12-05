import { HORIZON, VERTICAL } from '../config/objectConfig';
import getBackground from './getBackground';

const rotateCard = (canvas) => {
  const background = getBackground(canvas);
  const objects = canvas.getObjects().filter((obj) => obj.id !== 'background');

  const { width, height } = background;
  const mode = width > height ? 'toVertical' : 'toHorizon';

  if (mode === 'toVertical') {
    background.set('width', VERTICAL.width);
    background.set('height', VERTICAL.height);
  } else {
    background.set('width', HORIZON.width);
    background.set('height', HORIZON.height);
  }

  background.set('fill', '#ffffff');
  canvas.clipPath = background;
  canvas.remove(...objects);
  canvas.centerObject(background);
  canvas.renderAll();
};

export default rotateCard;
