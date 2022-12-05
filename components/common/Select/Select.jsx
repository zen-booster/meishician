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
      className="h-12 w-full basis-28 border border-black bg-white py-3 px-2"
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
