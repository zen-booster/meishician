import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import Drawer from './Drawer/Drawer';
import { logout } from '../../../store/actions';
import useClickOutside from '../../../hooks/useClickOutside';
import UploadModal from './Modal/UploadModal';

function Navbar() {
  const { isLogin, avatar } = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showExtra, setShowExtra] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const avatarRef = useRef();
  const router = useRouter();

  const toggleExtra = (e) => {
    if (!e) return setShowExtra(false);
    return setShowExtra(!showExtra);
  };

  useClickOutside(avatarRef, toggleExtra);

  const handleLogout = () => {
    dispatch(logout());
    setShowExtra(false);
    router.push('/');
  };

  return (
    <>
      <div className="fixed z-30 flex w-full items-center justify-between bg-main-01 py-2 pl-8 pr-11 text-body font-bold text-white shadow-01">
        <div className="flex items-center gap-14 ">
          <Link href="/" onClick={() => setIsOpen(false)}>
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
            <Link href="/card-wall" onClick={() => setIsOpen(false)}>
              名片牆
            </Link>
          </li>

          {isLogin && (
            <>
              <li className="hidden laptop:block">
                <Link href="/add-card">打造名片</Link>
              </li>
              <li className="hidden laptop:block">
                <Link href="/manage">管理名片</Link>
              </li>
              <li className="cursor-pointer py-1">
                <Link href="/notification" onClick={() => setIsOpen(false)}>
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
                className="cursor-pointer py-1 laptop:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Image
                  src="/hamburger-bar.svg"
                  width={18}
                  height={12}
                  alt="hamburger-bar"
                />
              </li>
              <li
                className="hidden laptop:relative laptop:block"
                onClick={toggleExtra}
                ref={avatarRef}
              >
                <Image
                  src={avatar || '/avatar.svg'}
                  className={`${
                    avatar && 'rounded-full'
                  } h-8 w-8 cursor-pointer`}
                  width={32}
                  height={32}
                  alt="avatar"
                />
              </li>

              <AnimatePresence>
                {showExtra && (
                  <motion.ul
                    className="absolute top-full right-0 hidden w-48 bg-white text-center laptop:block"
                    initial={{ x: '100%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'Inertia' }}
                  >
                    <li
                      className="cursor-pointer border-main-01 py-6 text-main-01 hover:bg-main-03  hover:text-white"
                      onClick={() => setShowEdit(true)}
                    >
                      上傳頭貼
                    </li>
                    <li
                      className="cursor-pointer border-main-01 py-6 text-danger hover:bg-danger  hover:text-white"
                      onClick={handleLogout}
                    >
                      登出
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
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
                onClick={() => setIsOpen(!isOpen)}
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <Drawer
            logout={handleLogout}
            setIsOpen={setIsOpen}
            setShowEdit={setShowEdit}
          />
        )}
      </AnimatePresence>
      {showEdit && <UploadModal setShowEdit={setShowEdit} />}
    </>
  );
}

export default Navbar;
