import { useState } from 'react';
import SectionTag from '../../SectionTag';
import CardHeader from './CardHeader';
import CardJobInfo from './CardJobInfo';
import FloatingMenu from '../../FloatingMenu';

export default function Card({
  name,
  corpNameTitle,
  contactNumber,
  tagArr,
  addDate,
  isPinned,
}) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleMenuActiveClick = () => {
    setIsMenuActive((prev) => !prev);
  };
  return (
    <div className="relative basis-full p-3  md:basis-1/2 lg:basis-1/3">
      <div className=" h-full rounded border border-black bg-white p-3">
        <CardHeader
          name={name}
          isPinned={isPinned}
          onMenuActiveClick={handleMenuActiveClick}
        />
        <CardJobInfo
          corpNameTitle={corpNameTitle}
          contactNumber={contactNumber}
        />

        <p className="mb-3 text-slate-300">加入時間 {addDate}</p>
        <div className="flex flex-wrap gap-2">
          {tagArr.map((ele) => (
            <SectionTag>{ele}</SectionTag>
          ))}
        </div>
      </div>

      {isMenuActive && (
        <div className="absolute top-14 right-3 z-10">
          <FloatingMenu />
        </div>
      )}
    </div>
  );
}
