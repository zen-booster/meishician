import FloatingMenuItem from './FloatingMenuItem';

function FloatingMenu() {
  return (
    <ul className="inline-block w-40">
      <FloatingMenuItem>編輯名片註記</FloatingMenuItem>
      <FloatingMenuItem warning>刪除名片</FloatingMenuItem>
    </ul>
  );
}

export default FloatingMenu;
