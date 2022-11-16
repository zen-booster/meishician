function Options({ data }) {
  const { value, hidden, content } = data;
  return (
    <option value={value} hidden={hidden}>
      {content}
    </option>
  );
}

function Select({ onChange, value, children }) {
  return (
    <select
      className="w-full border border-black bg-transparent py-2 text-center"
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
