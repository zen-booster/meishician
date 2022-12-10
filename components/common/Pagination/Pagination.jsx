import Image from 'next/image';

function Pagination() {
  const currentPage = 1;
  const totalPage = 10;
  console.log(currentPage);
  console.log(totalPage);
  const allPages = Array.from({ length: 10 }, (_, i) => i + 1);
  const lastPage = allPages.length;

  const pageShow = (page) => {
    if (page === 1 || page === lastPage) return page;
    if (page === currentPage) return page;
    if (page === currentPage - 1 || page === currentPage + 1) return page;
    if (page <= 5 && currentPage < 5) return page;
    if (page >= lastPage - 4 && currentPage > lastPage - 4) return page;
    return '...';
  };

  const pageStatus = (page) => {
    if (page === currentPage) return 'bg-main-02';
    if (page === 1 || page === lastPage) return '';
    if (page < 6 && currentPage < 5) return '';
    if (page > lastPage - 5 && currentPage > lastPage - 4) return '';
    if (page === currentPage - 1 || page === currentPage + 1) return '';
    if (page === 2) return 'pointer-events-none';
    if (page === lastPage - 1) return 'pointer-events-none';
    return 'hidden';
  };

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
        {allPages.map((page) => (
          <li
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 hover:bg-main-02 ${pageStatus(
              page
            )}`}
            key={page}
          >
            {pageShow(page)}
          </li>
        ))}
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
