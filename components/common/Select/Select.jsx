function Options({ data }) {
  const { value, hidden, content } = data;
  return (
    <option value={value} hidden={hidden} className="text-black">
      {content}
    </option>
  );
}

function Select({ onChange, value, children }) {
  return (
    <select
      className="w-full basis-28 rounded-xl border border-dark-light  bg-transparent py-3 px-2 text-dark-light"
      onChange={onChange}
      value={value}
    >
      {children.map((option) => (
        <Options key={option.id} data={option} />
      ))}
    </select>
  );
}

export default Select;
