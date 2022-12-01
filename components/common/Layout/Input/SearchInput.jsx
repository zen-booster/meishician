function SearchInput({ onChange, value, placeholder }) {
  return (
    <input
      type="text"
      className="rounded-l-lg border border-dark-light px-3 pl-5"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default SearchInput;
