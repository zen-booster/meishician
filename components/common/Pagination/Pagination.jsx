import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function Pagination({ currentPage, totalPage }) {
  const router = useRouter();
  const { pathname, query } = router;
  const allPages = Array.from({ length: totalPage }, (_, i) => i + 1);
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
    if (page === currentPage) return 'bg-main-02 pointer-events-none';
    if (page === 1 || page === lastPage) return '';
    if (page < 6 && currentPage < 5) return '';
    if (page > lastPage - 5 && currentPage > lastPage - 4) return '';
    if (page === currentPage - 1 || page === currentPage + 1) return '';
    if (page === 2) return 'pointer-events-none';
    if (page === lastPage - 1) return 'pointer-events-none';
    return 'hidden';
  };

  const toPreviousPage = () => {
    if (currentPage <= 1) return;
    router.push({ pathname, query: { ...query, page: currentPage - 1 } });
  };

  const toNextPage = () => {
    if (currentPage + 1 > totalPage) return;
    router.push({ pathname, query: { ...query, page: currentPage + 1 } });
  };

  return (
    <nav>
      <ul className="flex items-center justify-center gap-2">
        <li className="flex items-center">
          <button
            type="button"
            onClick={toPreviousPage}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft
              className={`pointer-events-none text-h4 text-main-01 ${
                currentPage === 1 && 'text-dark-light'
              }`}
            />
          </button>
        </li>
        {allPages.map((page) => (
          <li key={page}>
            <Link
              href={{
                pathname,
                query: { ...query, page },
              }}
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  text-body text-main-01 duration-200 hover:bg-main-02 ${pageStatus(
                page
              )}`}
            >
              {pageShow(page)}
            </Link>
          </li>
        ))}
        <li className="flex items-center">
          <button
            type="button"
            onClick={toNextPage}
            disabled={currentPage === lastPage}
          >
            <MdKeyboardArrowRight
              className={`pointer-events-none text-h4 text-main-01 ${
                currentPage === lastPage && 'text-dark-light'
              }`}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
