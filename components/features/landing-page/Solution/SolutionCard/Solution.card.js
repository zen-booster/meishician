import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function SolutionCard({ data }) {
  const { src, title, info } = data;

  useEffect(() => {
    AOS.init({ duration: 750 });
  }, []);

  return (
    <div
      className="mx-auto flex h-rwd-card-height w-64 flex-col justify-end rounded-xl bg-paper pt-4 shadow-02 laptop:h-card-height laptop:w-72"
      data-aos="zoom-in"
    >
      <div className="mb-4 h-full px-8">
        <Image
          src={src}
          alt={title}
          width={200}
          height={218}
          className="mx-auto h-full w-auto"
        />
      </div>
      <h3 className="mb-4 pl-4 text-4xl font-bold leading-9">
        <p className="mb-3 text-main-02">{title[0]}</p>
        <p className="text-main-01">{title[1]}</p>
      </h3>
      <p className="mb-2 pl-5 leading-7 text-black opacity-60 laptop:mb-6">
        {info[0]}
        <br />
        {info[1]}
      </p>
    </div>
  );
}

export default SolutionCard;
