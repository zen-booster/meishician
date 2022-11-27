function Input({ onChange, value, placeholder, type, title }) {
  return (
    <label className="flex flex-col">
      <p className="flex text-main-01">
        {title}
        <span className="text-danger ">*</span>
      </p>
      <input
        type={type}
        className="h-12 rounded-xl border border-dark-light px-3"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </label>
  );
}

export default Input;
