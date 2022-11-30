import introductionData from '../../../../data/introductionData';
import Section from './Section/Section';

function Introduction() {
  return (
    <>
      {introductionData.map((data, index) => (
        <Section key={data.id} data={data} index={index} />
      ))}
    </>
  );
}

export default Introduction;
