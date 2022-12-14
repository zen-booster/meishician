import { useState, useContext } from 'react';
import { fabric } from 'fabric-pure-browser';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fabricContext } from '../../../Canvas';
import { SET_ACTIVE } from '../../../../../../constants/constants';
import loadLocalImage from '../../../service/loadLocalImage';
import 'react-toastify/dist/ReactToastify.css';

function ImageTool() {
  const canvasRef = useContext(fabricContext);
  const [imagesArray, setImagesArray] = useState(loadLocalImage());
  const dispatch = useDispatch();

  const validImage = (file) => {
    const fileType = file.type;
    const validType = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validType.includes(fileType)) {
      toast.error('非符合格式圖片');
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('尺寸過大，無法存入');
      return false;
    }
    return true;
  };

  const saveLocalImage = (e) => {
    const file = e.target.files[0];
    if (file === undefined) return;
    if (!validImage(file)) return;

    const reader = new FileReader();
    reader.onload = (loadedFile) => {
      const base64 = loadedFile.target.result;
      const currentData = localStorage.getItem('images');
      if (!currentData) {
        const images = JSON.stringify([base64]);
        setImagesArray([base64]);
        localStorage.setItem('images', images);
      } else if (JSON.parse(currentData).length > 4) {
        toast.error('超出圖片保存上限');
      } else {
        const images = JSON.parse(currentData);
        images.unshift(base64);
        setImagesArray(images);
        const imagesJson = JSON.stringify(images);
        localStorage.setItem('images', imagesJson);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const renderImage = (e) => {
    const src = e.target.getAttribute('src');
    fabric.Image.fromURL(src, (img) => {
      canvasRef.current.centerObject(img);
      canvasRef.current.setActiveObject(img);
      canvasRef.current.add(img);
      canvasRef.current.renderAll();
      dispatch({ type: SET_ACTIVE, payload: img });
    });
  };

  const deleteLocalImage = (e) => {
    const targetIndex = e.target.getAttribute('data-index');
    const images = JSON.parse(localStorage.getItem('images'));
    images.splice(targetIndex, 1);
    setImagesArray(images);
    const imagesJson = JSON.stringify(images);
    localStorage.setItem('images', imagesJson);
  };

  return (
    <div className="w-full">
      <label className="mb-7 flex w-full cursor-pointer items-center justify-center rounded-xl border border-black bg-gray-02 py-1 text-body text-black">
        上傳圖片＋
        <input type="file" onChange={saveLocalImage} className="hidden" />
      </label>
      <p className="mb-2 text-white">保存圖片上限：5張</p>
      <div className="mb-6 h-0.5 w-full bg-gray-01" />
      <div className="scrollbar-hide max-h-[70vh] overflow-auto">
        {imagesArray &&
          imagesArray.map((image, index) => (
            <div key={Math.random()} className="group relative">
              <img
                src={image}
                alt="local-data"
                className="m-auto my-6 cursor-pointer duration-200 ease-in hover:scale-110"
                onClick={renderImage}
              />
              <button
                type="button"
                className="absolute top-2 right-2 z-10 hidden cursor-pointer text-2xl text-red-600 group-hover:block"
                onClick={deleteLocalImage}
                data-index={index}
              >
                <TiDelete className="pointer-events-none" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageTool;
