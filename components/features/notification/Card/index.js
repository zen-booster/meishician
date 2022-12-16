import format from 'date-fns/format';
import zhTW from 'date-fns/locale/zh-TW';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setMessageRead } from '../../../../store/actions/messageActions';
import Tag from '../Tag';

function Card({ message }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messageStatus);
  const { messageBody, category, createdAt, isRead, messageId } = message;
  const shortMessage =
    messageBody.length > 20 ? `${messageBody.slice(0, 20)}...` : messageBody;
  const [isFull, setIsFull] = useState(false);

  const formatTime = (createdAt) => {
    const formDate = format(new Date(createdAt), 'MMMdo', { locale: zhTW });
    return formDate;
  };

  const setIsRead = () => {
    if (isRead) return;
    const messageIndex = messages.indexOf(message);
    dispatch(setMessageRead(messageId, messageIndex));
  };

  return (
    <div
      className={`flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl ${
        isRead ? 'bg-gray-200' : 'bg-white'
      } text-body duration-200 hover:scale-105`}
      onClick={() => {
        setIsFull(!isFull);
        setIsRead();
      }}
    >
      <div className="flex w-full items-center justify-start py-5 pl-10 pr-6">
        <Image
          src="/dark-avatar.svg"
          width={72}
          height={72}
          alt="avatar"
          className="mr-12"
        />
        <p className="flex w-full items-center justify-between">
          {messageBody.length >= 20 && !isFull ? shortMessage : messageBody}
          {messageBody.length >= 20 && !isFull && (
            <span className="text-main-01">（繼續閱讀）</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-8 bg-main-02 pl-6 pr-8">
        <Tag type={category} />
        <div className="w-20">{formatTime(createdAt)}</div>
      </div>
    </div>
  );
}

export default Card;
