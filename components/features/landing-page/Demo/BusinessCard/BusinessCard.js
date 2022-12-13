import Image from 'next/image';

function BusinessCard({ data }) {
  const { src, mode } = data;
  if (mode === 'horizon') {
    return (
      <Image
        className="mx-12 shadow-02"
        src={src}
        alt="business-card"
        width={648}
        height={360}
      />
    );
  }
  return (
    <Image
      className="mx-12"
      src={data.src}
      alt="business-card"
      width={360}
      height={648}
    />
  );
}

export default BusinessCard;
