import Image from 'next/image';
import Link from 'next/link';

function Banner() {
  return (
    <div className="relative -mt-16 flex h-screen flex-col items-center bg-main-02 bg-cover font-bold text-main-01 laptop:bg-[url(/banner-background2.svg),_url(/banner-background.svg)]">
      <div className="mx-auto flex h-full w-full max-w-204 flex-col items-center pt-9 laptop:items-start laptop:pt-32">
        <div className="pt-16" />
        <Image
          src="/logo-dark.svg"
          width={280}
          height={112}
          alt="logo"
          priority
          className="mb-4 h-auto laptop:mb-6"
        />
        <h2 className="mb-6 text-5xl laptop:hidden">
          <p className="mb-6">電子名片</p>
          <p>商務方案</p>
        </h2>
        <p className="mb-12 laptop:mb-5 laptop:text-h5">
          電子名片製作、交換、管理一手搞定
        </p>

        <Link href="/add-card">
          <button
            type="button"
            className="mb-1 w-52 rounded-xl bg-main-01 py-5 text-center text-white"
          >
            立即試試
          </button>
        </Link>
        <Image
          src="/banner-image.svg"
          alt="meishician-image"
          priority
          width={375}
          height={358}
          className="mt-auto laptop:absolute laptop:bottom-0 laptop:left-1/2 laptop:-translate-x-1/2"
        />
      </div>
    </div>
  );
}

export default Banner;
