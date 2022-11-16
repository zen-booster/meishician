function Input({ onChange, value, placeholder, type }) {
  return (
    <input
      type={type}
      className="border border-black"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}

export default Input;
