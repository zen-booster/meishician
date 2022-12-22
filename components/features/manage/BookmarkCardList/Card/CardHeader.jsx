import { useState, useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaStar, FaRegStar } from 'react-icons/fa';

function CardHeader(props) {
  const { name, isPinned, onMenuActiveClick, onToggleCardPin } = props;
  const [starHover, setStarHover] = useState(false);
  const closeRef = useRef();

  return (
    <div className="mb-5 flex items-center">
      <h2 className="mr-auto text-xl font-bold">{name}</h2>
      <button
        className="mr-3 text-lg"
        type="button"
        onClick={(e) => {
          onToggleCardPin(e);
        }}
        onMouseEnter={() => setStarHover(true)}
        onMouseLeave={() => setStarHover(false)}
      >
        {starHover || isPinned ? <FaStar /> : <FaRegStar />}
      </button>

      <button
        className="dropdown-toggle text-2xl hover:text-slate-500"
        type="button"
        ref={closeRef}
        onClick={(e) => onMenuActiveClick(e)}
      >
        <BiDotsHorizontalRounded class="pointer-events-none" />
      </button>
    </div>
  );
}

export default CardHeader;
