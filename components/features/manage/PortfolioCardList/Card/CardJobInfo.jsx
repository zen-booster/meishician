function CardJobInfo({ jobTitle, companyName, phoneNumber }) {
  return (
    <div className="mb-3 leading-7">
      <p>{companyName}</p>
      <p>{jobTitle}</p>
      <p>{phoneNumber}</p>
    </div>
  );
}

export default CardJobInfo;
