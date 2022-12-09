import Image from 'next/image';
import Link from 'next/link';

function Card({ data }) {
  const {
    name,
    companyName,
    jobTitle,
    city,
    domain,
    cardImageData,
    avatar,
    cardId,
  } = data;

  return (
    <div className="mx-auto w-[17.875rem] overflow-hidden rounded-xl">
      <Link href={`/homepage/${cardId}`}>
        <div className="relative flex h-64 cursor-pointer items-center justify-center bg-main-02 px-3">
          <span className="absolute top-4 left-0 bg-blue-300 px-2 py-1">
            {domain}
          </span>
          <img src={cardImageData.front} alt="business-card" />
        </div>
      </Link>

      <div className="flex flex-col bg-main-01 px-4 pt-5 pb-4 text-white">
        <div className="mb-3 flex items-center">
          <div className="base-10 overflow-hidden rounded-full">
            <Image
              src={avatar || '/avatar.svg'}
              width={40}
              height={40}
              alt="business-card"
            />
          </div>
          <div className="ml-4 w-full">
            <div className="flex items-center">
              <p className="text-fs-6">{name}</p>
              <p className="mx-auto text-center text-label">{jobTitle}</p>
            </div>
            <p className="mb-1 text-rwd-body">{companyName}</p>
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
