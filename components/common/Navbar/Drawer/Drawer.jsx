import Avatar from '../../Avatar/Avatar';

function Drawer({ isLogin }) {
  return (
    <div className="bg-gray-300 sm:hidden">
      <ul className="flex flex-col items-center">
        {isLogin && (
          <li className="flex flex-col items-center py-3">
            <Avatar />
            <span className="text-xs">上傳照片</span>
          </li>
        )}
        <li className="py-3">名片牆</li>
        {isLogin ? (
          <>
            <li className="py-3">打造名片</li>
            <li className="py-3">管理名片</li>
            <li className="py-3">登出</li>
          </>
        ) : (
          <>
            <li className="py-3">Login</li>
            <li className="py-3">Sign Up</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Drawer;
