import Marquee from 'react-fast-marquee';
import BusinessCard from './BusinessCard/BusinessCard';
import horizonCards from '../../../../data/horizonCards';
import verticalCards from '../../../../data/verticalCards';

function Demo() {
  return (
    <div className="bg-main-02 py-16">
      <div className="mx-auto max-w-container overflow-hidden">
        <h3 className="mb-28 text-center text-h3 font-bold text-main-01">
          讓你的名片，創意與價值兼具
        </h3>

        <Marquee speed={100} gradient={false}>
          <div className="mb-24 flex">
            {horizonCards.map((data) => (
              <BusinessCard key={data.src} data={data} />
            ))}
          </div>
        </Marquee>

        <Marquee speed={100} gradient={false} direction="right">
          <div className="flex gap-12">
            {verticalCards.map((data) => (
              <BusinessCard key={data.id} data={data} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default Demo;
