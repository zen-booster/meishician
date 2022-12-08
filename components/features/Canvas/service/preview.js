import getBackground from './getBackground';
import toImage from './toImage';

function preview(canvas) {
  const background = getBackground(canvas);
  const previewImage = toImage(canvas, background);
  console.log(previewImage);
}

export default preview;
