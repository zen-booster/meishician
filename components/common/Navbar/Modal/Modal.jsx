import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Overlay from '../../Overlay/Overlay';
import { TOGGLE_LOADER } from '../../../../constants/constants';

export default function Modal({ setShowEdit, setAvatar }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const selectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      formData.append('file', file);
      setFile({ src: reader.result, data: formData });
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    dispatch({ type: TOGGLE_LOADER });
    axios
      .post('http://localhost:3001/api/upload/image', file.data)
      .then((res) => {
        setAvatar(res.data.imgUrl);
        axios.patch('http://localhost:3001/api/users/profile', {
          avatar: res.data.imgUrl,
        });
      })
      .catch((err) => {
        alert('error');
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: TOGGLE_LOADER });
        setShowEdit(false);
      });
  };

  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <Overlay show={setShowEdit} />
      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto w-full max-w-md rounded-md bg-white px-6 py-8 shadow-lg">
          <div className="flex flex-col items-center">
            <h4 className="mb-8 text-2xl font-medium text-gray-800">
              上傳圖片
            </h4>
            {file ? (
              <Image
                src={file.src}
                className="max-auto mb-6 h-52 w-52 rounded-xl border-2 border-main-01 p-4"
                width={208}
                height={208}
                alt="avatar"
              />
            ) : (
              <Image
                src="/avatar.svg"
                className="max-auto mb-6 rounded-xl bg-main-01 p-12"
                width={208}
                height={208}
                alt="avatar"
              />
            )}

            <p className="mb-8 text-center text-lg leading-relaxed text-gray-500">
              最大：2MB（PNG, JPG, JPEG） <br />
              建議比例 1：1（超過將進行壓縮）
            </p>

            <div className="w-full items-center gap-2 sm:flex">
              {file ? (
                <button
                  className="w-full flex-1 cursor-pointer rounded-md bg-main-01 p-2.5 text-center text-white outline-none ring-main-01 ring-offset-2 focus:ring-2"
                  type="button"
                  onClick={uploadImage}
                >
                  上傳檔案
                </button>
              ) : (
                <label className="block w-full flex-1 cursor-pointer rounded-md bg-main-01 p-2.5 text-center text-white outline-none ring-main-01 ring-offset-2 focus:ring-2">
                  選擇檔案
                  <input
                    type="file"
                    className="hidden"
                    onChange={selectImage}
                  />
                </label>
              )}

              <button
                className="w-full flex-1 rounded-md border p-2.5 text-gray-800 outline-none ring-black ring-offset-2 focus:ring-2"
                onClick={() => setShowEdit(false)}
                type="button"
              >
                取消上傳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
