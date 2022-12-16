import { useState } from 'react';
import Image from 'next/image';
import Tag from '../Tag';

function Card({ notification }) {
  const { messageBody, type, time } = notification;
  const shortMessage =
    messageBody.length > 20 ? `${messageBody.slice(0, 20)}...` : messageBody;
  const [isFull, setIsFull] = useState(false);

  const toggleFull = () => {
    setIsFull(!isFull);
  };

  return (
    <div
      className="flex w-full cursor-pointer justify-between overflow-hidden rounded-2xl bg-white text-body duration-200 hover:scale-105"
      onClick={toggleFull}
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
        <Tag type={type} />
        <div className="w-20">{time}</div>
      </div>
    </div>
  );
}

export default Card;
