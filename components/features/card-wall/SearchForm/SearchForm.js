import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import SearchInput from '../../../common/Input/SearchInput';
import Select from '../../../common/Select/Select';
// import Button from '../../../common/Button/Button';
import domainData from '../../../../data/domainData';
import areaData from '../../../../data/areaData';

const all = {
  id: Math.random(),
  content: 'All',
  value: 'all',
};

function SearchForm() {
  const allDomain = [all, ...domainData];
  const allArea = [all, ...areaData];

  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-8 w-204 rounded-xl bg-white px-16 pb-16 pt-6 shadow-frame"
    >
      <h3 className="mb-8 text-h5 text-main-01">搜尋名片</h3>

      <div className="flex gap-6">
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
        <div className="flex flex-1">
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
          <button
            className="flex h-12 basis-36 items-center justify-center rounded-r-xl bg-main-01"
            type="submit"
          >
            <Image src="/search.svg" alt="search-icon" width={18} height={18} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchForm;
