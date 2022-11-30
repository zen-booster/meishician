import { useState, useContext } from 'react';
import { fabric } from 'fabric';
import { GoCloudUpload } from 'react-icons/go';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { fabricContext } from '../../../Canvas';
import { SET_ACTIVE } from '../../../../../../../constants/constants';

function ImageTool() {
  const { canvasRef } = useContext(fabricContext);
  const [imagesArray, setImagesArray] = useState(null);
  const dispatch = useDispatch();

  function saveLocalImage(e) {
    if (e.target.files[0] === undefined) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (loadedFile) => {
      const base64 = loadedFile.target.result;
      const currentData = localStorage.getItem('images');
      if (!currentData) {
        const images = JSON.stringify([base64]);
        setImagesArray([base64]);
        localStorage.setItem('images', images);
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
  }

  function loadLocalImage() {
    const imagesJSON = localStorage.getItem('images');
    if (!imagesJSON) return null;
    return JSON.parse(imagesJSON);
  }

  function renderImage(e) {
    const src = e.target.getAttribute('src');
    fabric.Image.fromURL(src, (img) => {
      canvasRef.current.centerObject(img);
      canvasRef.current.setActiveObject(img);
      canvasRef.current.add(img);
      canvasRef.current.renderAll();
      dispatch({ type: SET_ACTIVE, payload: img });
    });
  }

  function deleteLocalImage(e) {
    const targetIndex = e.target.getAttribute('data-index');
    const images = JSON.parse(localStorage.getItem('images'));
    images.splice(targetIndex, 1);
    setImagesArray(images);
    const imagesJson = JSON.stringify(images);
    localStorage.setItem('images', imagesJson);
  }

  setImagesArray(loadLocalImage());

  return (
    <>
      <div className="w-full px-3">
        <div className="mb-6 h-12 rounded-md bg-black text-xl text-white">
          <label className="flex h-full w-full cursor-pointer items-center justify-center gap-3">
            <GoCloudUpload />
            上傳圖片
            <input type="file" onChange={saveLocalImage} className="hidden" />
          </label>
        </div>
      </div>
      {imagesArray && (
        <div className="h-full w-full overflow-y-auto px-6">
          {imagesArray.map((image, index) => (
            <div key={Math.random()} className="group relative">
              <img
                src={image}
                alt="local-data"
                className="my-6 cursor-pointer"
                onClick={renderImage}
              />
              <span
                className="absolute top-2 right-2 z-10 hidden cursor-pointer text-2xl text-red-600 group-hover:block"
                onClick={deleteLocalImage}
                data-index={index}
              >
                <TiDelete className="pointer-events-none" />
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ImageTool;
