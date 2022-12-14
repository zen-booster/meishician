import Image from 'next/image';
import Link from 'next/link';

const translate = {
  content: {
    design: '設計',
    engineering: '工程',
    management: '管理',
    media: '媒體',
    sales: '銷售',
    finance: '金融',
    administrative: '行政',
    technology: '科技',
    service: '服務',
    others: '其他',
  },
  color: {
    design: '#F4A7B9',
    engineering: '#DEB564',
    management: '#B4D6EF',
    media: '#C7A2E4',
    sales: '#91E27C',
    finance: '#C9C9C9',
    administrative: '#FF855F',
    technology: '#26E39F',
    service: '#FCF297',
    others: '#6DD0CD',
  },
};

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
    layoutDirection,
  } = data;

  return (
    <div className="mx-auto w-[17.875rem]">
      <Link href={`/homepage/${cardId}`}>
        <div className="relative flex h-64 cursor-pointer items-center justify-center rounded-t-xl bg-main-02 px-3 py-4">
          <span
            className="absolute top-4 left-0 bg-blue-300 px-4 text-body"
            style={{ backgroundColor: `${translate.color[domain]}` }}
          >
            {translate.content[domain]}
          </span>

          {layoutDirection === 'horizontal' ? (
            <Image
              src={cardImageData.front}
              className="w-full"
              width={9}
              height={5}
              alt="business-card"
            />
          ) : (
            <img
              src={cardImageData.front}
              className="h-full"
              alt="business-card"
            />
          )}
        </div>
      </Link>

      <div className="flex flex-col rounded-b-xl bg-main-01 px-4 pt-5 pb-4 text-white">
        <div className="mb-3 flex items-center">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={avatar || '/avatar.svg'}
              className="h-full w-full"
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
