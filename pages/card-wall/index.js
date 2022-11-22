import { useForm, Controller } from 'react-hook-form';
import Navbar from '../../components/common/Navbar/Navbar';
import Card from '../../components/features/card-wall/Card/Card';
import Button from '../../components/common/Button/Button';
import SearchInput from '../../components/common/Input/SearchInput';
import Select from '../../components/common/Select/Select';
import Pagination from '../../components/common/Pagination/Pagination';
import wallCards from '../../data/wallCards';
import domainData from '../../data/domainData';
import areaData from '../../data/areaData';

const all = {
  id: Math.random(),
  content: 'All',
  value: 'all',
};

function CardWall() {
  const allDomain = [all, ...domainData];
  const allArea = [all, ...areaData];

  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h2 className="my-12 text-center text-3xl font-bold">名片牆</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 md:self-start">
            <Controller
              control={control}
              name="search"
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <SearchInput
                  onChange={onChange}
                  value={value}
                  name={name}
                  placeholder="請輸入名片ID"
                />
              )}
            />
          </div>
          <div className="mb-4 flex flex-col gap-4 md:self-start">
            <Controller
              control={control}
              name="domain"
              defaultValue="all"
              render={({ field: { onChange, value, name } }) => (
                <Select onChange={onChange} value={value} name={name}>
                  {allDomain}
                </Select>
              )}
            />
            <Controller
              control={control}
              name="city"
              defaultValue="all"
              render={({ field: { onChange, value, name } }) => (
                <Select onChange={onChange} value={value} name={name}>
                  {allArea}
                </Select>
              )}
            />
          </div>
          <Button type="submit">搜尋</Button>
        </form>

        <div className="mb-10 grid grid-cols-1 place-content-center gap-8 md:grid-cols-2 lg:grid-cols-3">
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
