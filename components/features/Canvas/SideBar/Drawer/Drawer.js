import TextTool from './Tool/TextTool';
import ImageTool from './Tool/ImageTool';
import ShapeTool from './Tool/ShapeTool';

function Drawer({ buttonName }) {
  return (
    <div className="z-20 flex h-full w-52 flex-col items-center bg-gray-03">
      {buttonName === 'Text' && <TextTool />}
      {buttonName === 'Material' && <ShapeTool />}
      {buttonName === 'Image' && <ImageTool />}
    </div>
  );
}

export default Drawer;
