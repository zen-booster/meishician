import Text from '../../../module/Text';

function TextTool() {
  return (
    <ul className="flex w-full flex-col items-center justify-center gap-4 px-3 py-4">
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-2xl text-white">
        <Text content="新增標題" size={32} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-xl text-white">
        <Text content="新增副標題" size={24} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white">
        <Text content="新增文字內容" size={16} />
      </li>
    </ul>
  );
}

export default TextTool;
