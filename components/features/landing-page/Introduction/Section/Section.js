import Image from 'next/image';

function Section({ data, index }) {
  const { src, title, infos } = data;

  return (
    <div
      className={`flex min-h-screen items-center justify-center font-bold text-main-01 ${
        index % 2 !== 0 && 'bg-main-02'
      }`}
    >
      <div className="m-auto flex max-w-container flex-col items-center justify-center gap-10 p-5 laptop:flex-row laptop:gap-6">
        <div className={`max-w-full ${index % 2 !== 0 && 'laptop:order-1'}`}>
          <Image src={src} alt="introduction-image" width={562} height={303} />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="mb-12 text-rwd-h3 laptop:text-h3">
            {title.map((item) => (
              <p key={item} className="leading-tight">
                {item}
              </p>
            ))}
          </h3>
          <ul>
            {infos.map((info) => (
              <li
                key={info}
                className="mb-4 flex items-center text-body laptop:text-h5"
              >
                <Image
                  src="/index-icon.svg"
                  width={79}
                  height={72}
                  alt="icon"
                />
                {info}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Section;
