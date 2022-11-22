import { useState } from 'react';
import Avatar from '../../../common/Avatar/Avatar';
import Tag from '../Tag';

function Card({ notification }) {
  const { messageBody, type, isRead, time } = notification;
  const [isFull, setIsFull] = useState(false);

  const toggleFull = () => {
    setIsFull(!isFull);
  };

  return (
    <div
      className={`flex w-full flex-col items-center justify-between gap-3 ${
        isRead ? 'bg-gray-300' : 'bg-gray-100'
      } mb-3 cursor-pointer rounded-lg py-5 px-10 sm:flex-row`}
      onClick={toggleFull}
    >
      <div className="flex w-full items-center justify-start gap-3">
        <Avatar />
        <p>
          {messageBody.length >= 10 && !isFull
            ? messageBody.slice(0, 10)
            : messageBody}{' '}
          {messageBody.length >= 10 && !isFull && (
            <span className=" text-sm text-gray-600">...繼續閱讀</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        <Tag type={type} />
        <div className="w-16">{time}</div>
      </div>
    </div>
  );
}

export default Card;
