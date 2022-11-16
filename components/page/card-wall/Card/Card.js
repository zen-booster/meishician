import Avatar from '../../../common/Avatar/Avatar';

function Top({ domain, src }) {
  return (
    <div className="relative flex h-64 w-80 items-center justify-center bg-gray-400">
      <span className="absolute top-0 left-0 bg-blue-300 px-2 py-1">
        {domain}
      </span>
      <img src={src} alt="" />
    </div>
  );
}

function Bottom({ name, company, title, city }) {
  console.log();
  return (
    <div className="flex w-80 flex-col bg-gray-300 p-3">
      <div className="mb-3 flex items-center gap-2">
        <Avatar />
        <div>
          <p className="font-bold">{name}</p>
          <p>
            {company} <span>{title}</span>
          </p>
        </div>
      </div>
      {city === '海外' ? (
        <p className="ml-11 text-sm text-slate-600">{city}</p>
      ) : (
        <p className="ml-11 text-sm text-slate-600">台灣，{city}</p>
      )}
    </div>
  );
}

function Card({ data }) {
  const { name, company, title, city, domain, src } = data;
  return (
    <div>
      <Top domain={domain} src={src} />
      <Bottom name={name} company={company} title={title} city={city} />
    </div>
  );
}

export default Card;
