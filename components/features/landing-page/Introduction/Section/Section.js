import Image from 'next/image';

function Section({ data, index }) {
  const { src, title, infos } = data;

  const imageSize = (index) => {
    switch (index) {
      case 0:
        return {
          width: 562,
          height: 303,
        };
      case 1:
        return {
          width: 596,
          height: 400,
        };
      case 2:
        return {
          width: 596,
          height: 400,
        };
      default:
    }
    return undefined;
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center overflow-hidden font-bold text-main-01 ${
        index % 2 !== 0 && 'bg-main-02'
      }`}
    >
      <div
        className="m-auto flex max-w-container flex-col items-center justify-center gap-20 px-5 py-12 laptop:flex-row laptop:gap-6"
        data-aos={index % 2 !== 0 ? 'fade-right' : 'fade-left'}
        data-aos-delay="250"
      >
        <div
          className={`max-w-full flex-1 ${index % 2 !== 0 && 'laptop:order-1'}`}
        >
          <Image
            src={src}
            alt="introduction-image"
            width={imageSize(index).width}
            height={imageSize(index).height}
          />
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <h3 className="mb-12 text-center text-rwd-h3 laptop:text-left laptop:text-h3">
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
