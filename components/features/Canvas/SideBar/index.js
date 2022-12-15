import { useState, useRef } from 'react';
import Image from 'next/image';
import Drawer from './Drawer/Drawer';

function SideBar() {
  const clickRef = useRef();
  const [showDrawer, setShowDrawer] = useState(false);
  const [buttonName, setButtonName] = useState('');

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
        <li
          className={`relative h-20 w-full duration-200 hover:text-white ${
            buttonName === 'Template' && 'text-white shadow-01'
          }`}
        >
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
              buttonName === 'Template' && 'bg-hover-01'
            }`}
            name="Template"
            onClick={toggleDrawer}
          >
            <Image
              src="/template.svg"
              width={40}
              height={30}
              alt="template"
              className="pointer-events-none"
            />
            <span className="pointer-events-none">名片模板</span>
          </button>
          <div
            className={`absolute top-1/2 left-full h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-03 ${
              buttonName === 'Template' ? 'block' : 'hidden'
            }`}
          />
        </li>
        <li
          className={`relative h-20 w-full duration-200 hover:text-white ${
            buttonName === 'Text' && 'text-white shadow-01'
          }`}
        >
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
              buttonName === 'Text' && 'bg-hover-01'
            }`}
            name="Text"
            onClick={toggleDrawer}
          >
            <Image
              src="/text.svg"
              width={40}
              height={30}
              alt="text"
              className="pointer-events-none"
            />
            <span className="pointer-events-none">新增文字</span>
          </button>
          <div
            className={`absolute top-1/2 left-full h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-03 ${
              buttonName === 'Text' ? 'block' : 'hidden'
            }`}
          />{' '}
        </li>
        <li
          className={`relative h-20 w-full duration-200 hover:text-white ${
            buttonName === 'Material' && 'text-white shadow-01'
          }`}
        >
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
              buttonName === 'Material' && 'bg-hover-01'
            }`}
            name="Material"
            onClick={toggleDrawer}
          >
            <Image
              src="/shape.svg"
              width={40}
              height={30}
              alt="shape"
              className="pointer-events-none"
            />
            <span className="pointer-events-none">素材庫</span>
          </button>
          <div
            className={`absolute top-1/2 left-full h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-03 ${
              buttonName === 'Material' ? 'block' : 'hidden'
            }`}
          />{' '}
        </li>
        <li
          className={`relative h-20 w-full duration-200 hover:text-white ${
            buttonName === 'Image' && 'text-white shadow-01'
          }`}
        >
          <button
            type="button"
            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center ${
              buttonName === 'Image' && 'bg-hover-01'
            }`}
            name="Image"
            onClick={toggleDrawer}
          >
            <Image
              src="/image.svg"
              width={40}
              height={30}
              alt="image"
              className="pointer-events-none"
            />
            <span className="pointer-events-none">圖片</span>
          </button>
          <div
            className={`absolute top-1/2 left-full h-4 w-4 -translate-y-1/2 -translate-x-1/2 rotate-45 bg-gray-03 ${
              buttonName === 'Image' ? 'block' : 'hidden'
            }`}
          />{' '}
        </li>
      </ul>

      {showDrawer && (
        <Drawer buttonName={buttonName} toggleDrawer={toggleDrawer} />
      )}
    </div>
  );
}

export default SideBar;
