function SearchInput({ onChange, value, placeholder }) {
  return (
    <input
      type="text"
      className="border border-black"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

export default SearchInput;
