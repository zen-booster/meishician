import { useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SearchInput from '../../../common/Input/SearchInput';
import { defaultDomain } from '../../../../data/domainData';
import { defaultArea } from '../../../../data/areaData';

const all = {
  content: 'All',
  value: 'all',
};

function SearchForm() {
  const router = useRouter();
  const { pathname, query } = router;
  const allDomain = [all, ...defaultDomain];
  const allArea = [all, ...defaultArea];
  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { domain, city, name } = data;
    router.push({ pathname, query: { ...query, domain, city, name, page: 1 } });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-container rounded-xl bg-white pb-8 pt-4 shadow-01"
    >
      <h3 className="mb-8 text-center text-h5 font-bold text-main-01">
        搜尋名片
      </h3>

      <div className="flex w-full flex-col justify-center gap-6 px-3 sm:flex-row">
        <div className="flex gap-6">
          <select
            {...register('domain')}
            className="h-12 w-full rounded-lg border border-dark-light bg-white px-2 text-dark-light sm:w-44"
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
            className="h-12 w-full rounded-lg border border-dark-light bg-white px-2 text-dark-light sm:w-44"
          >
            {allArea.map((city) => (
              <option key={city.value} value={city.value}>
                {city.content}
              </option>
            ))}
          </select>
        </div>

        <div className="flex h-12 sm:w-96">
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
