import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Space from '../../Space/Space';

function Drawer({ logout, setIsOpen, setShowEdit }) {
  const { isLogin, avatar } = useSelector((state) => state.loginStatus);

  const closeNavbar = () => setIsOpen(false);

  return (
    <div className="fixed inset-0 z-10 laptop:hidden">
      <div
        className="fixed inset-0 -z-10 bg-black opacity-40"
        onClick={closeNavbar}
      />
      <Space />
      <motion.div
        className="ml-auto h-full w-72 bg-white text-fs-6 font-bold text-main-01"
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'Inertia' }}
      >
        <ul className="flex flex-col items-center gap-3 py-8 text-center">
          {isLogin && (
            <>
              <li
                className="w-full px-12"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                <div className="mb-3 flex w-full cursor-pointer flex-col items-center gap-2 hover:bg-slate-100 active:bg-slate-100">
                  <Image
                    src={avatar || '/avatar.svg'}
                    className={`${avatar && 'rounded-full'} h-8 w-8`}
                    width={32}
                    height={32}
                    alt="avatar"
                  />
                  <span type="button" className="text-body">
                    上傳照片
                  </span>
                </div>
              </li>
              <li className="w-full px-12">
                <Link
                  href="/card-wall"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  名片牆
                </Link>
              </li>
              <li className="w-full px-12">
                <Link
                  href="/add-card"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  打造名片
                </Link>
              </li>
              <li className="w-full px-12">
                <Link
                  href="/manage"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  管理名片
                </Link>
              </li>
              <li className="w-full px-12 text-danger">
                <button
                  type="button"
                  className="w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </>
          )}

          {!isLogin && (
            <>
              <li className="w-full px-12">
                <Link
                  href="card-wall"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  名片牆
                </Link>
              </li>
              <li className="w-full px-12">
                <Link
                  href="/login"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  登入
                </Link>
              </li>

              <li className="w-full px-12">
                <Link
                  href="/sign-up"
                  className="block h-full w-full py-2 hover:bg-slate-100 active:bg-slate-100"
                  onClick={closeNavbar}
                >
                  註冊
                </Link>
              </li>
            </>
          )}
        </ul>
      </motion.div>
    </div>
  );
}

export default Drawer;
