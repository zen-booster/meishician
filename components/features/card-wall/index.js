import SearchForm from './SearchForm/SearchForm';
import wallCards from '../../../data/wallCards';
import Card from './Card/Card';
import Pagination from '../../common/Pagination/Pagination';

function CardWall() {
  return (
    <div>
      <div className="mb-20 w-full bg-main-02 pb-8 pt-12">
        <h2 className="mb-10 text-center text-h2 font-bold text-main-01">
          名片牆
        </h2>
        <SearchForm />
      </div>

      <div className="mx-auto mb-20 max-w-204">
        <div className="grid grid-cols-3 gap-8">
          {wallCards ? (
            wallCards.map((card) => <Card key={card.id} data={card} />)
          ) : (
            <div>沒資料啦</div>
          )}
        </div>
      </div>

      <div className="mx-auto mb-10 max-w-204">
        <Pagination />
      </div>
    </div>
  );
}

export default CardWall;
