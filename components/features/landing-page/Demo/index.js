import BusinessCard from './BusinessCard/BusinessCard';
import horizonCards from '../../../../data/horizonCards';
import verticalCards from '../../../../data/verticalCards';

function Demo() {
  return (
    <div className="overflow-hidden bg-gray-400 py-20">
      <h3 className="mb-12 text-center text-3xl font-bold">各種名片</h3>
      <div className="mb-24 flex gap-12">
        {horizonCards.map((data) => (
          <BusinessCard key={data.id} data={data} />
        ))}
      </div>
      <div className="flex gap-12">
        {verticalCards.map((data) => (
          <BusinessCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Demo;
