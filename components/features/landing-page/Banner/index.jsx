import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Space from '../../../common/Space/Space';

function Banner() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('auth');
    if (loginStatus?.startsWith('Bear')) setIsLogin(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center bg-main-02 bg-cover font-bold text-main-01 laptop:bg-banner laptop:bg-cover laptop:bg-center">
      <div className="mx-auto flex min-h-screen  w-full max-w-[63.125rem] flex-col items-center pt-9 laptop:items-start laptop:pt-32">
        <Space />
        <Image
          src="/logo-dark.svg"
          width={161}
          height={64}
          alt="logo"
          priority
          className="mb-4 h-auto w-[17.5rem] laptop:mb-6"
        />
        <h2 className="mb-6 text-5xl laptop:hidden">
          <p className="mb-6">電子名片</p>
          <p>商務方案</p>
        </h2>
        <p className="mb-12 laptop:mb-5 laptop:text-h5">
          電子名片製作、交換、管理一手搞定
        </p>

        <Link href={isLogin ? '/add-card' : '/login'}>
          <button
            type="button"
            className="mb-1 w-52 rounded-xl bg-main-01 py-5 text-center text-white duration-200 hover:bg-main-03"
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
          className="mt-auto w-[29.125rem] laptop:absolute laptop:bottom-0 laptop:left-1/2 laptop:-translate-x-1/2"
        />
      </div>
    </div>
  );
}

export default Banner;
