function InfoInput({ onChange, value, placeholder, type, title }) {
  return (
    <label className="flex flex-col">
      <p className="flex text-main-01">
        {title}
        <span className="text-danger ">*</span>
      </p>
      <input
        type={type}
        className="border border-black py-2 px-3 text-body"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InfoInput;
