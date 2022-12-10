import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Drawer from './Drawer/Drawer';
import { LOGOUT } from '../../../constants/constants';
import useClickOutside from '../../../hooks/useClickOutside';
import UploadModal from './Modal/UploadModal';

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
      <div className="fixed z-30 flex h-16 w-full items-center justify-between bg-main-01 py-2 pl-8 pr-11 font-bold text-white shadow-01">
        <div className="flex items-center gap-14 ">
          <Link href="/">
            <Image
              src="/logo-dark.svg"
              alt="logo"
              width={161}
              height={64}
              priority
            />
          </Link>
          <span className="hidden laptop:block">電子名片商務方案</span>
        </div>
        <ul className="flex items-center gap-12">
          <li className="hidden laptop:block laptop:h-full">
            <Link href="/card-wall">名片牆</Link>
          </li>

          {isLogin && (
            <>
              <li className="hidden laptop:block laptop:cursor-pointer">
                <Link href="/add-card">打造名片</Link>
              </li>
              <li className="hidden laptop:block laptop:cursor-pointer">
                <Link href="management">管理名片</Link>
              </li>
              <li className="cursor-pointer py-1 laptop:cursor-pointer">
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
                className="cursor-pointer py-1 laptop:hidden laptop:cursor-pointer"
                onClick={toggleDrawer}
                ref={drawerRef}
              >
                <Image
                  src="/hamburger-bar.svg"
                  width={18}
                  height={12}
                  alt="hamburger-bar"
                />
              </li>
              <li
                className="hidden laptop:relative laptop:block laptop:cursor-pointer"
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
                <Link href="/sign-up">
                  <button
                    type="button"
                    className="w-20 rounded-md bg-main-02 py-1 text-main-01"
                  >
                    註冊
                  </button>
                </Link>
              </li>
              <li className="hidden laptop:block">
                <Link href="/login">
                  <button
                    type="button"
                    className="w-20 rounded-md border border-white bg-main-01 py-1 text-white "
                  >
                    登入
                  </button>
                </Link>
              </li>
              <li
                className="cursor-pointer py-1 laptop:hidden"
                onClick={toggleDrawer}
                ref={drawerRef}
              >
                <Image
                  src="/hamburger-bar.svg"
                  width={18}
                  height={12}
                  alt="hamburger-bar"
                />
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

      {showEdit && <UploadModal setShowEdit={setShowEdit} />}
      {children}
    </>
  );
}

export default Navbar;
