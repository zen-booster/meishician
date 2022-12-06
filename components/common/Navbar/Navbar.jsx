import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Drawer from './Drawer/Drawer';
import Button from '../Button/Button';
import { LOGOUT } from '../../../constants/constants';
import useClickOutside from '../../../hooks/useClickOutside';
import Modal from './Modal/Modal';

function Navbar({ children }) {
  const { isLogin, avatar } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const avatarRef = useRef();
  const drawerRef = useRef();
  const router = useRouter();

  const toggleDrawer = (e) => {
    if (!e) return setIsOpen(false);
    return setIsOpen(!isOpen);
  };

  const toggleExtra = (e) => {
    if (!e) return setShowExtra(false);
    return setShowExtra(!showExtra);
  };

  useClickOutside(drawerRef, toggleDrawer);
  useClickOutside(avatarRef, toggleExtra);

  const logout = () => {
    localStorage.removeItem('auth');
    dispatch({ type: LOGOUT });
    setShowExtra(false);
    router.push('/');
  };

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-between bg-main-01 px-5 py-2 text-white shadow-01">
        <div className="flex items-center gap-14 ">
          <Link href="/">
            <Image src="/logo-dark.png" alt="logo" width={161} height={65} />
          </Link>
          <span className="hidden laptop:block">電子名片商務方案</span>
        </div>
        <ul className="flex items-center">
          <li className="hidden laptop:block laptop:h-full laptop:px-6">
            <Link href="/card-wall">名片牆</Link>
          </li>

          {isLogin && (
            <>
              <li className="hidden laptop:block laptop:cursor-pointer laptop:px-6">
                <Link href="/add-card">打造名片</Link>
              </li>
              <li className="hidden laptop:block laptop:cursor-pointer laptop:px-6">
                <Link href="management">管理名片</Link>
              </li>
              <li className="cursor-pointer px-4 py-1 laptop:cursor-pointer laptop:px-6">
                <Link href="/notification">
                  <Image
                    className="cursor-pointer"
                    src="/business-card.svg"
                    alt="notification"
                    width={31}
                    height={31}
                  />
                </Link>
              </li>
              <li
                className="cursor-pointer px-4 py-1 laptop:hidden laptop:cursor-pointer laptop:px-6"
                onClick={toggleDrawer}
                ref={drawerRef}
              >
                <MdMenu className="text-sm" />
              </li>
              <li
                className="hidden laptop:relative laptop:block laptop:cursor-pointer laptop:px-6"
                onClick={toggleExtra}
                ref={avatarRef}
              >
                <Image
                  src={avatar || '/avatar.svg'}
                  className={`${avatar && 'rounded-full'} h-8 w-8`}
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </li>

              {showExtra && (
                <ul className="absolute top-full right-0 hidden w-24 bg-white text-center laptop:block">
                  <li
                    className="cursor-pointer py-2 text-main-01"
                    onClick={() => setShowEdit(true)}
                  >
                    上傳頭貼
                  </li>
                  <li
                    className="cursor-pointer py-2 text-danger"
                    onClick={logout}
                  >
                    登出
                  </li>
                </ul>
              )}
            </>
          )}

          {!isLogin && (
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
              <li
                className="cursor-pointer px-8 py-1 laptop:hidden"
                onClick={toggleDrawer}
                ref={drawerRef}
              >
                <MdMenu className="text-sm" />
              </li>
            </>
          )}
        </ul>

        {isOpen && (
          <Drawer
            isLogin={isLogin}
            logout={logout}
            setShowEdit={setShowEdit}
            avatar={avatar}
          />
        )}
      </div>
      <div className="pt-16" />

      {showEdit && <Modal setShowEdit={setShowEdit} />}
      {children}
    </>
  );
}

export default Navbar;
