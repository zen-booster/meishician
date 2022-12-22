import { useSelector } from 'react-redux';
import Text from '../../../module/Text';

function TextTool() {
  const cardInfo = useSelector((state) => state.cardInfo);
  const { name, companyName, jobTitle, phoneNumber, domain, city } = cardInfo;
  return (
    <ul className="flex w-full flex-col items-center justify-center gap-4">
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-2xl text-white duration-200 ease-in hover:scale-110">
        <Text content="新增標題" size={52} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-xl text-white duration-200 ease-in hover:scale-110">
        <Text content="新增副標題" size={36} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content="新增文字內容" size={24} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content={name} size={24} />
      </li>

      {companyName && (
        <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
          <Text content={companyName} size={24} />
        </li>
      )}

      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content={jobTitle} size={24} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content={phoneNumber} size={24} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content={domain} size={24} />
      </li>
      <li className="flex h-12 w-full items-center justify-center rounded-md bg-black text-center text-base text-white duration-200 ease-in hover:scale-110">
        <Text content={city} size={24} />
      </li>
    </ul>
  );
}

export default TextTool;
