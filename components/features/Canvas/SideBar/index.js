import { useState, useRef } from 'react';
import Image from 'next/image';
import Drawer from './Drawer/Drawer';

function SideBar() {
  const clickRef = useRef();
  const [showDrawer, setShowDrawer] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const categories = [
    {
      buttonName: 'Template',
      name: '名片模板',
      src: '/template.svg',
      hoverSrc: '/template-hover.svg',
    },
    {
      buttonName: 'Text',
      name: '新增文字',
      src: '/text.svg',
      hoverSrc: '/text-hover.svg',
    },
    {
      buttonName: 'Material',
      name: '素材庫',
      src: '/shape.svg',
      hoverSrc: '/shape-hover.svg',
    },
    {
      buttonName: 'Image',
      name: '圖片',
      src: '/image.svg',
      hoverSrc: '/image-hover.svg',
    },
  ];

  const toggleDrawer = (e) => {
    const targetName = e.target.getAttribute('name');

    switch (targetName) {
      case undefined:
        break;
      case buttonName:
        if (showDrawer) setButtonName(null);
        setShowDrawer(!showDrawer);
        break;
      case 'close':
        if (showDrawer) setButtonName(null);
        setShowDrawer(false);
        break;
      default:
        setShowDrawer(true);
        setButtonName(targetName);
    }
  };

  return (
    <div className="flex" ref={clickRef}>
      <ul className="h-scree flex w-28 flex-col items-center bg-main-02 text-rwd-body text-main-03">
        {categories.map((category) => (
          <li
            className={`relative h-24 w-full duration-200 hover:text-white ${
              buttonName === category.buttonName && 'text-white shadow-01'
            }`}
            key={category.buttonName}
          >
            <button
              type="button"
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
                buttonName === category.buttonName && 'bg-hover-01'
              }`}
              name={category.buttonName}
              onClick={toggleDrawer}
            >
              {buttonName === category.buttonName ? (
                <Image
                  src={category.hoverSrc}
                  width={40}
                  height={30}
                  alt="image"
                  className="pointer-events-none"
                />
              ) : (
                <Image
                  src={category.src}
                  width={40}
                  height={30}
                  alt="image"
                  className="pointer-events-none"
                />
              )}
              <span className="pointer-events-none font-bold">
                {category.name}
              </span>
            </button>
            <div
              className={`absolute top-1/2 left-full h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-03 ${
                buttonName === category.buttonName ? 'block' : 'hidden'
              }`}
            />
          </li>
        ))}
      </ul>

      {showDrawer && (
        <Drawer buttonName={buttonName} toggleDrawer={toggleDrawer} />
      )}
    </div>
  );
}

export default SideBar;
