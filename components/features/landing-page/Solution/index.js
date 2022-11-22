import SolutionCard from './SolutionCard/Solution.card';
import solutionData from '../../../../data/solutionData';

function Solution() {
  return (
    <div className="py-20">
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 ">
        {solutionData.map((data) => (
          <SolutionCard key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Solution;
