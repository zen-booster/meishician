import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const labelColor = {
  設計: '#F4A7B9',
  工程: '#DEB564',
  管理: '#B4D6EF',
  媒體: '#C7A2E4',
  銷售: '#91E27C',
  金融: '#C9C9C9',
  行政: '#FF855F',
  科技: '#26E39F',
  服務: '#FCF297',
  其他: '#6DD0CD',
};

function Card({ data, index }) {
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
    <motion.div
      className="mx-auto w-[17.875rem] duration-200 ease-in hover:z-20 hover:scale-105"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Link href={`/homepage/${cardId}`}>
        <div className="relative flex h-64 cursor-pointer items-center justify-center rounded-t-xl bg-main-02 px-3 py-4">
          <span
            className="absolute top-4 left-0 bg-blue-300 px-4 text-body"
            style={{ backgroundColor: `${labelColor[domain]}` }}
          >
            {domain}
          </span>

          {layoutDirection === 'horizontal' ? (
            <Image
              src={cardImageData.front}
              className="mt-6 w-full"
              width={262}
              height={146}
              alt="business-card"
            />
          ) : (
            <Image
              src={cardImageData.front}
              className="h-full object-contain"
              width={146}
              height={224}
              alt="business-card"
            />
          )}
        </div>
      </Link>

      <div className="flex h-40 flex-col rounded-b-xl bg-main-01 px-4 pt-5 pb-4 text-white">
        <div className="flex h-full items-center">
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
              <h4 className="text-h5 font-bold">{name}</h4>
              <p className="mx-auto text-center">{jobTitle}</p>
            </div>
            <p className="mb-1 text-rwd-body">{companyName}</p>
            <div className="flex text-main-02">
              <Image
                src="/pin-map.svg"
                width={16}
                height={24}
                alt="pin-map"
                className="mr-2"
              />
              {city === '海外' ? (
                <p className="">{city}</p>
              ) : (
                <p className="">台灣，{city}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
