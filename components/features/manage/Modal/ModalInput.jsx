function ModalInput({
  name,
  onChange,
  value,
  defaultValue,
  placeholder,
  className,
}) {
  return (
    <input
      type="text"
      name={name}
      id={name}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      className={`w-full border border-b-black py-1 px-2 text-lg ${
        className ?? ''
      }`}
    />
  );
}

export default ModalInput;
