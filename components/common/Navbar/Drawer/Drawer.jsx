import Link from 'next/link';
import Image from 'next/image';

function Drawer({ isLogin, logout, setShowEdit, avatar }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-gray-300 laptop:hidden">
      <ul className="flex flex-col items-center">
        {isLogin && (
          <li
            className="flex cursor-pointer flex-col items-center py-3"
            onClick={() => {
              setShowEdit(true);
            }}
          >
            <Image
              src={avatar || '/avatar.svg'}
              className={`${avatar && 'rounded-full'} h-8 w-8`}
              width={32}
              height={32}
              alt="avatar"
            />
            <span type="button" className="text-xs">
              上傳照片
            </span>
          </li>
        )}
        <li className="py-3">
          <Link href="card-wall">名片牆</Link>
        </li>
        {isLogin ? (
          <>
            <li className="py-3">
              <Link href="/add-card">打造名片</Link>
            </li>
            <li className="py-3">
              <Link href="/management">管理名片</Link>
            </li>
            <li className="cursor-pointer py-3" onClick={logout}>
              登出
            </li>
          </>
        ) : (
          <>
            <li className="py-3">
              <Link href="/login">Login</Link>
            </li>

            <li className="py-3">
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Drawer;
