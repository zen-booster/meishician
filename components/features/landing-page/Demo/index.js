import Marquee from 'react-fast-marquee';
import BusinessCard from './BusinessCard/BusinessCard';
import horizonCards from '../../../../data/horizonCards';
import verticalCards from '../../../../data/verticalCards';

function Demo() {
  return (
    <div className="bg-main-02 py-24">
      <div className="mx-auto max-w-container overflow-hidden">
        <h3 className="mb-20 text-center text-rwd-h3 font-bold text-main-01 laptop:mb-28 laptop:text-h3">
          讓你的名片
          <br className="laptop:hidden" />
          <span className="hidden laptop:inline-block">，</span>
          創意與價值兼具
        </h3>

        <Marquee speed={50} gradient={false}>
          <div className="mb-20 flex laptop:mb-24">
            {horizonCards.map((data) => (
              <BusinessCard key={data.src} data={data} />
            ))}
          </div>
        </Marquee>

        <Marquee speed={50} gradient={false} direction="right">
          <div className="mb-4 flex gap-12">
            {verticalCards.map((data) => (
              <BusinessCard key={data.src} data={data} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Demo;
