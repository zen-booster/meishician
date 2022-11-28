import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import Drawer from './Drawer/Drawer';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';

function Navbar({ children }) {
  const isLogin = true;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-between  bg-main-01 px-5 py-2 text-white">
        <div className="flex items-center gap-14 ">
          <Link href="/">
            <Image
              src="/logo-dark.png"
              alt="hamburger bar"
              width={161}
              height={64}
              onClick={toggleDrawer}
            />
          </Link>
          <span className="hidden laptop:block">電子名片商務方案</span>
        </div>
        <ul className="flex items-center">
          <li className="hidden laptop:block laptop:h-full laptop:px-6">
            <Link href="/card-wall">名片牆</Link>
          </li>

          {isLogin ? (
            <>
              <li className="hidden laptop:block laptop:px-6">
                <Link href="/canvas-editor">打造名片</Link>
              </li>
              <li className="hidden laptop:block laptop:px-6">
                <Link href="management">管理名片</Link>
              </li>
              <li className="cursor-pointer px-4 py-1 laptop:px-6">
                <Link href="/notification">
                  <Image
                    className="cursor-pointer"
                    src="/business-card.svg"
                    alt="hamburger bar"
                    width={31}
                    height={28}
                    onClick={toggleDrawer}
                  />
                </Link>
              </li>
              <li className="cursor-pointer px-4 py-1 laptop:hidden laptop:px-6">
                <MdMenu className="text-sm" onClick={toggleDrawer} />
              </li>
              <li className="hidden laptop:block laptop:px-6">
                <Avatar />
              </li>
            </>
          ) : (
            <>
              <li className="hidden laptop:block">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
              </li>
              <li className="hidden laptop:block">
                <Link href="sign-up">
                  <Button>Sign Up</Button>
                </Link>
              </li>
              <li className="cursor-pointer px-8 py-1 laptop:hidden">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/5358/5358649.png"
                  alt="hamburger bar"
                  width={32}
                  height={28}
                  className="h-7 w-8"
                  onClick={toggleDrawer}
                />
              </li>
            </>
          )}
        </ul>

        {isOpen && <Drawer isLogin={isLogin} />}
      </div>
      <div className="pt-16" />
      {children}
    </>
  );
}

export default Navbar;
