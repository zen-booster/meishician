import Image from 'next/image';

function Banner() {
  return (
    <div className="relative -mt-16 flex h-screen flex-col items-center bg-main-02 bg-cover text-main-01 laptop:bg-banner">
      <div className="mx-auto flex h-full w-full max-w-204 flex-col items-center laptop:items-start">
        <div className="pt-16" />
        <Image
          src="/logo-dark.png"
          width={280}
          height={111}
          alt="logo"
          className="mt-9 mb-4 laptop:mt-32 laptop:mb-6"
        />
        <h2 className="mb-6 text-5xl laptop:hidden">
          <p className="mb-6">電子名片</p>
          <p>商務方案</p>
        </h2>
        <p className="mb-12 laptop:mb-5 laptop:text-h5">
          電子名片製作、交換、管理一手搞定
        </p>
        <button
          type="button"
          className="mb-1 w-52 rounded-xl bg-main-01 py-5 text-center text-white"
        >
          立即試試
        </button>
        <Image
          src="/banner-image.png"
          alt="meishician-image"
          width={375}
          height={358}
          className="mt-auto laptop:absolute laptop:bottom-0 laptop:left-1/2 laptop:-translate-x-1/2"
        />
      </div>
    </div>
  );
}

export default Banner;
