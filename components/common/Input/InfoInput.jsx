function InfoInput({ onChange, value, placeholder, type, title }) {
  return (
    <label className="flex flex-col">
      <p className="flex text-main-01">
        {title}
        <span className="text-danger ">*</span>
      </p>
      <input
        type={type}
        className="h-12 border border-black px-3"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InfoInput;
