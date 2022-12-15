import Circle from '../../../module/Circle';
import Rectangle from '../../../module/Rect';
import Triangle from '../../../module/Triangle';
import Line from '../../../module/Line';

function ShapeTool() {
  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-4 text-3xl">
      <li className="flex h-28 w-28 cursor-pointer items-center justify-center duration-200 ease-in hover:scale-110">
        <Rectangle />
      </li>
      <li className="flex h-28 w-28 cursor-pointer items-center justify-center duration-200 ease-in hover:scale-110">
        <Circle />
      </li>
      <li className="flex h-28 w-28 cursor-pointer items-center justify-center duration-200 ease-in hover:scale-110">
        <Triangle />
      </li>
      <li className="flex h-28 w-28 cursor-pointer items-center justify-center duration-200 ease-in hover:scale-110">
        <Line />
      </li>
    </ul>
  );
}

export default ShapeTool;
