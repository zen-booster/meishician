function Section({ data, index }) {
  const { src, title, infos } = data;

  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 sm:flex-row">
      <div
        className={`order-first max-w-full ${index % 2 !== 0 && 'sm:order-1'}`}
      >
        <img src={src} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="mb-12 font-bold">{title}</h3>
        <ul>
          {infos.map((info) => (
            <li key={Math.random()} className="mb-8">
              {info}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Section;
