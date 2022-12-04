import { useState, useRef } from 'react';
import { FaShapes, FaImage } from 'react-icons/fa';
import { GrTemplate } from 'react-icons/gr';
import { TfiText } from 'react-icons/tfi';
import Drawer from './Drawer/Drawer';
import useClickOutside from '../../../../hooks/useClickOutside';

function SideBar() {
  const clickRef = useRef();
  const [showDrawer, setShowDrawer] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const toggleDrawer = (e) => {
    if (e === undefined) {
      setShowDrawer(false);
      setButtonName(null);
      return;
    }

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
  useClickOutside(clickRef, toggleDrawer);

  return (
    <div className="flex" ref={clickRef}>
      <ul className="h-scree relative flex w-28 flex-col items-center gap-5 bg-main-02 px-3 py-5 text-sm">
        <li>
          <button
            type="button"
            className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1  ${
              buttonName === 'Template' && 'rounded-md bg-gray-200'
            }`}
            name="Template"
            onClick={toggleDrawer}
          >
            <GrTemplate className="pointer-events-none h-10 w-10" />
            <span className="pointer-events-none">名片模板</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1  ${
              buttonName === 'Text' && 'rounded-md bg-gray-200'
            }`}
            name="Text"
            onClick={toggleDrawer}
          >
            <TfiText className="pointer-events-none h-10 w-10" />
            <span className="pointer-events-none">新增文字</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1  ${
              buttonName === 'Material' && 'rounded-md bg-gray-200'
            }`}
            name="Material"
            onClick={toggleDrawer}
          >
            <FaShapes className="pointer-events-none h-10 w-10" />
            <span className="pointer-events-none">素材庫</span>
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1  ${
              buttonName === 'Image' && 'rounded-md bg-gray-200'
            }`}
            name="Image"
            onClick={toggleDrawer}
          >
            <FaImage className="pointer-events-none h-10 w-10" />
            <span className="pointer-events-none">圖片</span>
          </button>
        </li>
      </ul>
      {showDrawer && (
        <Drawer closeDrawer={toggleDrawer} buttonName={buttonName} />
      )}
    </div>
  );
}

export default SideBar;
