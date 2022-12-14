import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchForm from './SearchForm/SearchForm';
import wallCards from '../../../data/wallCards';
import Card from './Card/Card';
import Pagination from '../../common/Pagination/Pagination';

// eslint-disable-next-line no-unused-vars
function CardWall({ currentPage, totalPage, records }) {
  const [page, setPage] = useState(1);
  const router = useRouter();
  console.log(router.query);

  useEffect(() => {}, [router.query]);
  return (
    <>
      <div className="mb-20 w-full bg-card-wall bg-cover bg-center pb-8 pt-12">
        <h2 className="mb-10 text-center text-h2 font-bold text-main-01">
          名片牆
        </h2>
        <SearchForm />
      </div>

      <div className="mx-auto mb-20 max-w-container">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 laptop:grid-cols-3 xl:grid-cols-4">
          {wallCards ? (
            records.map((record) => <Card key={record.cardId} data={record} />)
          ) : (
            <div>沒資料啦</div>
          )}
        </div>
      </div>

      <div className="mx-auto mb-10 max-w-204">
        <Pagination totalPage={totalPage} currentPage={currentPage} />
      </div>
    </>
  );
}

export default CardWall;
