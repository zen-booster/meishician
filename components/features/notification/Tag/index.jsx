function Tag({ type }) {
  const isDelete = type === 'DELETE';
  return (
    <div
      className={`h-6 w-6 rounded-full ${
        isDelete ? 'bg-danger' : 'bg-[#FFB800]'
      }`}
    />
  );
}

export default Tag;
