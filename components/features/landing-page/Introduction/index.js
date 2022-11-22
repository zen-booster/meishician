import introductionData from '../../../../data/introductionData';
import Section from './Section/Section';

function Introduction() {
  return (
    <div>
      {introductionData.map((data, index) => (
        <Section key={data.id} data={data} index={index} />
      ))}
    </div>
  );
}

export default Introduction;
