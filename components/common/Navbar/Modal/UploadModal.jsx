import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';
import { TOGGLE_LOADER, SET_AVATAR } from '../../../../constants/constants';

export default function UploadModal({ setShowEdit }) {
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
        dispatch({ type: SET_AVATAR, payload: res.data.imgUrl });
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
    <Modal show={setShowEdit}>
      <div className="flex flex-col items-center font-bold text-main-01">
        <h4 className="mb-8 text-h4">上傳圖片</h4>
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

        <p className="mb-8 text-center text-fs-6">
          最大：2MB（PNG, JPG, JPEG） <br />
          建議比例 1：1（超過會壓縮圖片）
        </p>

        <div className="flex gap-12">
          {file ? (
            <Button className="w-36 bg-main-01" onClick={uploadImage}>
              上傳檔案
            </Button>
          ) : (
            <label className="flex w-36 cursor-pointer items-center justify-center rounded-xl bg-main-01 text-fs-6 text-white">
              選擇檔案
              <input type="file" className="hidden" onChange={selectImage} />
            </label>
          )}

          <Button
            variant="outlined"
            className="w-36 bg-white"
            onClick={() => setShowEdit(false)}
          >
            取消上傳
          </Button>
        </div>
      </div>
    </Modal>
  );
}
