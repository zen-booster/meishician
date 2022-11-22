import { useState } from 'react';
import { FaShapes, FaImage } from 'react-icons/fa';
import { GrTemplate } from 'react-icons/gr';
import { TfiText } from 'react-icons/tfi';
import Drawer from './Drawer/Drawer';

function SideBar() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const toggleDrawer = (e) => {
    const targetName = e.target.getAttribute('name');

    switch (targetName) {
      case undefined:
        break;
      case buttonName:
        setShowDrawer(!showDrawer);
        break;
      case 'close':
        setShowDrawer(false);
        break;
      default:
        setShowDrawer(true);
        setButtonName(targetName);
    }
  };

  return (
    <ul className="h-scree relative z-20 flex flex-col items-center gap-5 px-3 py-5 text-sm">
      <li>
        <button
          type="button"
          className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1"
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
          className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1"
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
          className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1"
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
          className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1"
          name="Image"
          onClick={toggleDrawer}
        >
          <FaImage className="pointer-events-none h-10 w-10" />
          <span className="pointer-events-none">圖片</span>
        </button>
      </li>

      {showDrawer && (
        <Drawer closeDrawer={toggleDrawer} buttonName={buttonName} />
      )}
    </ul>
  );
}

export default SideBar;
