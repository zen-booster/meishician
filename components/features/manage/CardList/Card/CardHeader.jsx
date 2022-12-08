import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaStar, FaRegStar } from 'react-icons/fa';

function CardHeader({ name, isPinned, onMenuActiveClick }) {
  return (
    <div className="mb-2 flex items-center">
      <h2 className="mr-auto text-xl font-bold">{name}</h2>
      <button className="mr-3 text-lg" type="button">
        {isPinned ? <FaStar /> : <FaRegStar />}
      </button>

      <button
        className="text-2xl hover:text-slate-500"
        type="button"
        onClick={() => onMenuActiveClick()}
      >
        <BiDotsHorizontalRounded />
      </button>
    </div>
  );
}

export default CardHeader;
