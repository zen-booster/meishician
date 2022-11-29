import Link from 'next/link';
import Avatar from '../../Avatar/Avatar';

function Drawer({ isLogin, logout, setShowEdit }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-gray-300 laptop:hidden">
      <ul className="flex flex-col items-center">
        {isLogin && (
          <li
            className="flex flex-col items-center py-3"
            onClick={() => {
              setShowEdit(true);
            }}
          >
            <Avatar />
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
              <Link href="/canvas-editor">打造名片</Link>
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
