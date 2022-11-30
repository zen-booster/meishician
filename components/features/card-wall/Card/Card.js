import Image from 'next/image';
import Avatar from '../../../common/Avatar/Avatar';

function Card({ data }) {
  const { name, company, title, city, domain, src } = data;
  return (
    <div className="w-64 overflow-hidden rounded-xl">
      <div className="relative flex h-64 items-center justify-center bg-main-02">
        <span className="absolute top-4 left-0 bg-blue-300 px-2 py-1">
          {domain}
        </span>
        <img src={src} alt="business-card" />
      </div>

      <div className="flex flex-col bg-main-01 px-4 pt-5 pb-4 text-white">
        <div className="mb-3 flex items-center">
          <Avatar />
          <div className="ml-4 w-full">
            <div className="flex items-center">
              <p className="text-fs-6">{name}</p>
              <p className="mx-auto text-center text-label">{title}</p>
            </div>
            <p className="mb-1 text-rwd-body">{company}</p>
            <div className="flex text-main-02">
              <Image
                src="/pin-map.svg"
                width={16}
                height={19}
                alt="pin-map"
                className="mr-2"
              />
              {city === '海外' ? (
                <p className="text-label ">{city}</p>
              ) : (
                <p className="text-label">台灣，{city}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
