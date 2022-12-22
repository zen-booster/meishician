import { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function CardHeader(props) {
  const { name, onMenuActiveClick } = props;
  const closeRef = useRef();

  return (
    <div className="mb-5 flex items-center">
      <h2 className="mr-auto text-xl font-bold">{name}</h2>
      <button
        className="dropdown-toggle  text-2xl hover:text-slate-500"
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
