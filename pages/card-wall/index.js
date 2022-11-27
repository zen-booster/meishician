import Navbar from '../../components/common/Navbar/Navbar';
import Card from '../../components/features/card-wall/Card/Card';
import Pagination from '../../components/common/Pagination/Pagination';
import wallCards from '../../data/wallCards';
import SearchForm from '../../components/features/card-wall/SearchForm/SearchForm';

function CardWall() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="w-full bg-main-02">
          <h2 className="mt-12 mb-10 text-center text-h2 font-bold text-main-01">
            名片牆
          </h2>
          <SearchForm />
        </div>

        <div className="md:grid-cols-2 lg:grid-cols-3 mb-10 grid grid-cols-1 place-content-center gap-8">
          {wallCards ? (
            wallCards.map((card) => <Card key={card.id} data={card} />)
          ) : (
            <div>沒資料啦</div>
          )}
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default CardWall;
