function Tag({ type }) {
  const isDelete = type === 'DELETE';
  return (
    <div
      className={`h-4 w-4 rounded-full ${
        isDelete ? 'bg-red-500' : 'bg-orange-500'
      }`}
    />
  );
}

export default Tag;
