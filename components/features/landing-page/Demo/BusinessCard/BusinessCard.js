import Image from 'next/image';

function BusinessCard({ data }) {
  const { src, mode } = data;
  if (mode === 'horizon') {
    return (
      <Image
        className="mx-12 w-96 shadow-02 laptop:w-[30rem]"
        src={src}
        alt="business-card"
        width={648}
        height={360}
      />
    );
  }
  return (
    <Image
      className="mx-12 h-96 w-auto shadow-02 laptop:h-[30rem]"
      src={data.src}
      alt="business-card"
      width={360}
      height={648}
    />
  );
}

export default BusinessCard;
