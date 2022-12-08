import Card from './Card';

export default function CardList({ dataArr }) {
  return (
    <div className="-mx-3 flex flex-wrap">
      {dataArr.map((ele) => (
        <Card
          name={ele.name}
          corpNameTitle={ele.corpNameTitle}
          contactNumber={ele.contactNumber}
          tagArr={ele.tagArr}
          addDate={ele.addDate}
          isPinned={ele.isPinned}
        />
      ))}
    </div>
  );
}
