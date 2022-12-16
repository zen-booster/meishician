export default function SearchBar() {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 "
      >
        Search
      </label>
      <div className="relative flex">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 "
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          className="right-2.5 bottom-2.5 w-[70px] rounded-r-lg bg-main-01  py-2 text-sm font-medium text-white "
        >
          搜尋
        </button>
      </div>
    </form>
  );
}
