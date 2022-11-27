import Image from 'next/image';

function Pagination() {
  return (
    <div className="flex items-center justify-center">
      <Image
        src="/caret-left.svg"
        className="cursor-pointer"
        width="11"
        height="17"
        alt="previous-page"
      />
      <Image
        src="/caret-right.svg"
        className="cursor-pointer"
        width="11"
        height="17"
        alt="next-page"
      />
    </div>
  );
}

export default Pagination;
