function SolutionCard({ data }) {
  return (
    <div className="flex flex-col items-center justify-center bg-green-300 py-8">
      <img src={data.src} alt="" className="mb-5" />
      <h3 className="mb-5 text-3xl font-bold">{data.title}</h3>
      <p>{data.info}</p>
    </div>
  );
}

export default SolutionCard;
