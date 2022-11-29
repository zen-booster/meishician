import { FaAngleLeft } from 'react-icons/fa';
import TextTool from './Tool/TextTool';
import ImageTool from './Tool/ImageTool';
import ShapeTool from './Tool/ShapeTool';

function Drawer({ closeDrawer, buttonName }) {
  return (
    <div className="absolute top-0 left-28 z-20 flex h-full w-80 flex-col items-center bg-gray-100">
      <div className="text-lg mb-4 flex w-full items-center justify-between px-5 py-5">
        <span>{buttonName}</span>
        <button onClick={closeDrawer} name="close" type="button">
          <FaAngleLeft className="pointer-events-none" />
        </button>
      </div>

      {buttonName === 'Text' && <TextTool />}
      {buttonName === 'Image' && <ImageTool />}
      {buttonName === 'Material' && <ShapeTool />}
    </div>
  );
}

export default Drawer;
