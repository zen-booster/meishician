function LinkCard({ data }) {
  const { title, info, icon } = data;
  return (
    <div className="flex w-full items-center gap-3 bg-gray-200 px-6 py-3 ">
      <img src={icon} alt="" className="h-12 w-12" />
      <div>
        <p className="font-bold">{title}</p>
        <p>{info}</p>
      </div>
    </div>
  );
}

export default LinkCard;
