import Circle from '../../../module/Circle';
import Rectangle from '../../../module/Rect';
import Triangle from '../../../module/Triangle';
import Line from '../../../module/Line';

function ShapeTool() {
  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-4 px-3 text-3xl">
      <li className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-black text-center text-white">
        <Rectangle />
      </li>
      <li className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-black text-center text-white">
        <Circle />
      </li>
      <li className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-black text-center text-white">
        <Triangle />
      </li>
      <li className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-md bg-black text-center text-white">
        <Line />
      </li>
    </ul>
  );
}

export default ShapeTool;
