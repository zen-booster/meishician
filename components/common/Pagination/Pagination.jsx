import Image from 'next/image';

function Pagination({ totalPage, currentPage }) {
  console.log(currentPage);
  console.log(totalPage);

  return (
    <nav>
      <ul className="flex items-center justify-center gap-2">
        <li className="mr-4 flex items-center">
          <button type="button" disabled>
            <Image
              src="/caret-left.svg"
              className="cursor-pointer"
              width="11"
              height="17"
              alt="previous-page"
            />
          </button>
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          1
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          2
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          3
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          4
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          5
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          6
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          7
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          8
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          9
        </li>
        <li className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02">
          10
        </li>
        <li className="ml-4 flex items-center">
          <button type="button">
            <Image
              src="/caret-right.svg"
              className="cursor-pointer"
              width="11"
              height="17"
              alt="next-page"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
