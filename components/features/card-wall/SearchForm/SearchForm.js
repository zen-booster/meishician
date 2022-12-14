import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchInput from '../../../common/Input/SearchInput';
import domainData from '../../../../data/domainData';
import areaData from '../../../../data/areaData';

const all = {
  id: Math.random(),
  content: 'All',
  value: 'all',
};

function SearchForm() {
  const router = useRouter();
  const { pathname, query } = router;
  const allDomain = [all, ...domainData];
  const allArea = [all, ...areaData];
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { domain, city, name } = data;
    router.push({ pathname, query: { ...query, domain, city, name } });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-container rounded-xl bg-white pb-8 pt-4 shadow-01"
    >
      <h3 className="mb-8 text-center text-h5 font-bold text-main-01">
        搜尋名片
      </h3>

      <div className="flex h-12 w-full justify-center gap-6">
        <select
          {...register('domain')}
          className="w-44 rounded-lg border border-dark-light bg-white px-2 text-dark-light"
        >
          {allDomain.map((domain) => (
            <option
              key={domain.value}
              value={domain.value}
              className="text-black"
            >
              {domain.content}
            </option>
          ))}
        </select>

        <select
          {...register('city')}
          className="w-44 rounded-lg border border-dark-light bg-white px-2 text-dark-light"
        >
          {allArea.map((city) => (
            <option key={city.value} value={city.value}>
              {city.content}
            </option>
          ))}
        </select>

        <div className="flex w-96">
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <SearchInput
                onChange={onChange}
                value={value}
                name={name}
                placeholder="名字（選填）"
              />
            )}
          />
          <button
            className="flex basis-36 items-center justify-center rounded-r-xl bg-main-01"
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
