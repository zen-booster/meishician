import format from 'date-fns/format';
import zhTW from 'date-fns/locale/zh-TW';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { setMessageRead } from '../../../../store/actions/messageActions';
import Tag from '../Tag';

function Card({ message, avatar }) {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messageStatus);
  const { messageBody, category, createdAt, isRead, messageId } = message;
  const [isFull, setIsFull] = useState(false);

  const multipleLines = messageBody.includes('\n');
  const firstLine = multipleLines
    ? messageBody.substring(0, messageBody.indexOf('\n'))
    : messageBody;

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
      className={`flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-2xl laptop:flex-row ${
        isRead ? 'bg-gray-200' : 'bg-white'
      } text-body duration-200 hover:scale-105`}
      onClick={() => {
        setIsFull(!isFull);
        setIsRead();
      }}
    >
      <div className="flex w-full flex-col justify-start overflow-hidden py-5 px-10 laptop:flex-row laptop:items-center">
        <Image
          src={avatar || '/dark-avatar.svg'}
          width={72}
          height={72}
          alt="avatar"
          className="mr-12 mb-2 h-12 w-12 rounded-full laptop:mb-0"
        />
        {isFull && <p className="whitespace-pre-wrap">{messageBody}</p>}
        {!isFull && (
          <p className="truncate">
            {firstLine}{' '}
            {multipleLines && <span className="align-super">...</span>}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 bg-main-02 py-2 pl-6 pr-8 laptop:gap-8">
        <Tag type={category} />
        <div className="w-20">{formatTime(createdAt)}</div>
      </div>
    </div>
  );
}

export default Card;
