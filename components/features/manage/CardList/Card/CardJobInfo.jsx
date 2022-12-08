function CardJobInfo({ corpNameTitle, contactNumber }) {
  return (
    <div className="mb-3">
      <p>{corpNameTitle}</p>
      <p>{contactNumber}</p>
    </div>
  );
}

export default CardJobInfo;
