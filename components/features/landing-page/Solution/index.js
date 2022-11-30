import SolutionCard from './SolutionCard/Solution.card';
import solutionData from '../../../../data/solutionData';

function Solution() {
  return (
    <div className="py-8 laptop:py-32">
      <h2 className="mx-auto mb-6 flex h-28 w-64 flex-col justify-center text-2xl font-bold leading-6 text-main-01 laptop:mb-24 laptop:h-fit laptop:w-fit laptop:text-h3">
        現在起，不再煩惱名片
        <br className="laptop:hidden" />
        要放哪裡！
      </h2>
      <div className="mx-auto max-w-container">
        <div className="flex flex-col justify-evenly gap-y-6 laptop:flex-row">
          {solutionData.map((data) => (
            <SolutionCard key={data.title} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Solution;
