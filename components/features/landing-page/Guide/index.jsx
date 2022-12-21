import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Button from '../../../common/Button/Button';

function Guide() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('auth');
    if (loginStatus?.startsWith('Bear')) setIsLogin(true);
  }, []);

  return (
    <div className="flex flex-col items-center bg-main-02 px-5 pt-11 pb-12 font-bold laptop:pt-12 laptop:pb-16">
      <Image
        src="/logo-light.svg"
        width={480}
        height={193}
        alt="logo"
        className="mb-4 w-64 laptop:mb-7"
      />
      <h3 className="mb-7 text-center text-2xl">
        <span style={{ color: '#E6684F' }}>MEISHI</span>cian
        <br className="laptop:hidden" />
        幫你的名片施加魔法🪄
      </h3>
      <Link href={isLogin ? '/add-card' : '/login'}>
        <Button
          variant="contained"
          className="w-52 bg-main-04 duration-200 hover:bg-danger"
        >
          立即使用
        </Button>
      </Link>
    </div>
  );
}

export default Guide;
