import { useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaStar, FaRegStar } from 'react-icons/fa';

function CardHeader(props) {
  const { name, isPinned, onMenuActiveClick, onToggleCardPin } = props;
  const closeRef = useRef();
  // useClickOutSide(closeRef, () => {
  //   onCloseAll();
  //   console.log('hi');
  // });
  return (
    <div className="mb-2 flex items-center">
      <h2 className="mr-auto text-xl font-bold">{name}</h2>
      <button
        className="mr-3 text-lg"
        type="button"
        onClick={(e) => onToggleCardPin(e)}
      >
        {isPinned ? <FaStar /> : <FaRegStar />}
      </button>

      <button
        className="text-2xl hover:text-slate-500"
        type="button"
        ref={closeRef}
        onClick={(e) => onMenuActiveClick(e)}
      >
        <BiDotsHorizontalRounded />
      </button>
    </div>
  );
}

export default CardHeader;
