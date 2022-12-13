function CardJobInfo({ jobTitle, companyName, phoneNumber }) {
  return (
    <div className="mb-3">
      <p>{companyName}</p>
      <p>{jobTitle}</p>
      <p>{phoneNumber}</p>
    </div>
  );
}

export default CardJobInfo;
