import { useState } from 'react';
import Image from 'next/image';
import Drawer from './Drawer/Drawer';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';

function Navbar() {
  const isLogin = true;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="fixed z-50 flex h-16 w-full items-center justify-between bg-red-300 py-4 px-4">
        <div className="cursor-pointer text-2xl">MEISHIcian</div>
        <ul className="flex items-center gap-3 text-lg">
          <li className="hidden sm:block">
            <Button>名片牆</Button>
          </li>
          {isLogin ? (
            <>
              <li className="hidden sm:block">
                <Button>打造名片</Button>
              </li>
              <li className="hidden sm:block">
                <Button>管理名片</Button>
              </li>
              <li className="cursor-pointer px-4 py-1">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/565/565422.png"
                  alt="notification"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </li>
              <li className="hidden sm:block">
                <Avatar />
              </li>
              <li className="cursor-pointer px-4 py-1 sm:hidden">
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
          ) : (
            <>
              <li className="hidden sm:block">
                <Button>Login</Button>
              </li>
              <li className="hidden sm:block">
                <Button>Sign Up</Button>
              </li>
              <li className="cursor-pointer px-8 py-1 sm:hidden">
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
      </div>
      <div className="pt-16" />
      {isOpen && <Drawer isLogin={isLogin} />}
    </>
  );
}

export default Navbar;
