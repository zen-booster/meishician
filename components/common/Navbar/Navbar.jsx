import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from './Drawer/Drawer';
import Avatar from '../Avatar/Avatar';
import Button from '../Button/Button';
import { LOGIN, LOGOUT } from '../../../constants/constants';
import useClickOutside from '../../../hooks/useClickOutside';
import Modal from './Modal/Modal';

function Navbar({ children }) {
  const { isLogin } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const avatarRef = useRef();
  const drawerRef = useRef();

  const toggleDrawer = (e) => {
    if (!e) return setIsOpen(false);
    return setIsOpen(!isOpen);
  };

  const toggleExtra = (e) => {
    if (!e) return setShowExtra(false);
    return setShowExtra(!showExtra);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    dispatch({ type: LOGOUT });
    setShowExtra(false);
  };

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    axios.defaults.headers.common.Authorization = auth;
    axios
      .get('http://localhost:3001/api/users/check')
      .then(() => {
        dispatch({ type: LOGIN });
      })
      .catch(() => {
        localStorage.removeItem('auth');
      });
  }, [isLogin]);

  useClickOutside(drawerRef, toggleDrawer);
  useClickOutside(avatarRef, toggleExtra);

  return (
    <>
      <div className="fixed z-30 flex h-16 w-full items-center justify-between  bg-main-01 px-5 py-2 text-white">
        <div className="flex items-center gap-14 ">
          <Link href="/">
            <Image src="/logo-dark.png" alt="logo" width={161} height={64} />
          </Link>
          <span className="hidden laptop:block">電子名片商務方案</span>
        </div>
        <ul className="flex items-center">
          <li className="hidden laptop:block laptop:h-full laptop:px-6">
            <Link href="/card-wall">名片牆</Link>
          </li>

          {isLogin ? (
            <>
              <li className="hidden laptop:block laptop:cursor-pointer laptop:px-6">
                <Link href="/canvas-editor">打造名片</Link>
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
                    height={28}
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
                <Avatar />
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
          <Drawer isLogin={isLogin} logout={logout} setShowEdit={setShowEdit} />
        )}
      </div>
      <div className="pt-16" />
      {children}

      {showEdit && <Modal setShowEdit={setShowEdit} />}
    </>
  );
}

export default Navbar;
