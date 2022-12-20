import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { pickBy } from 'lodash';

import Image from 'next/image';
import UploadImageModal from '../../../../common/UploadImageModal';
import Button from '../../../../common/Button/Button';

import {
  setLinkEditorData,
  updateLinkInfo,
  deleteLink,
  addNewLink,
} from '../../../../../store/actions/homepageActions';

import linkTypeIconMap from '../../../../../data/linkTypeIconMap';
import trashBinIcon from '../../../../../public/icons/trash-bin.svg';

export default function EditorMode({ idData, linkData, isNewLink }) {
  const [isOpenUploadModal, setIsOpenUploadModal] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();

  const { uploadImgUrl } = useSelector((state) => state.homepage.linkEditor);
  const { activeType } = useSelector((state) => state.homepage.linkEditor);

  const { cardId, linkId, token } = idData ?? {};
  const { title, subTitle, link, icon } = linkData ?? {};

  const iconSrc = linkTypeIconMap[activeType];

  const placeholder = {
    title: isNewLink && '請輸入標題(必填)',
    subTitle: isNewLink && '請輸入副標題',
    link: isNewLink && '請輸入連結或Email',
  };

  const defaultValue = {
    title: (!isNewLink && title) || '',
    subTitle: (!isNewLink && subTitle) || '',
    link: (!isNewLink && link) || '',
    type: (!isNewLink && activeType) || '',
  };

  function handleUploadImg(uploadImgUrl) {
    dispatch(
      setLinkEditorData({
        uploadImgUrl,
      })
    );
  }

  function handleActiveTypeChange(type) {
    dispatch(
      setLinkEditorData({
        activeType: type,
      })
    );
  }

  function handleDeleteLink() {
    dispatch(deleteLink(cardId, token, linkId));
  }

  const onSubmit = (submitData) => {
    submitData = pickBy(submitData, (value) => value.length > 0);
    if (isNewLink) {
      dispatch(addNewLink(cardId, token, submitData));
    } else {
      dispatch(updateLinkInfo(cardId, token, linkId, submitData));
    }
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: false,
        activeLinkId: null,
        activeType: null,
        uploadImgUrl: null,
      })
    );
  };

  return (
    <form
      className="py-5 px-4  laptop:py-7 laptop:px-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3 flex items-center">
        <select
          name="type"
          id="type"
          defaultValue={activeType}
          {...register('type')}
          onChange={(e) => handleActiveTypeChange(e.target.value)}
          className="mr-auto block  w-1/2 border py-2 px-1 laptop:w-1/3"
        >
          {Object.keys(linkTypeIconMap).map((linkType) => (
            <option value={linkType} key={linkType}>
              {linkType}
            </option>
          ))}
        </select>

        {!isNewLink && (
          <button
            className="flex items-center hover:font-bold"
            type="button"
            onClick={handleDeleteLink}
          >
            <Image className="mr-3" src={trashBinIcon} alt="delete link" />
            <p className=" text-rose-500">刪除</p>
          </button>
        )}
      </div>

      <label htmlFor="link" className="">
        <p className="mb-2  font-bold"> 連結網址</p>
        <input
          type="text"
          name="link"
          id="link"
          placeholder={placeholder.link}
          defaultValue={defaultValue.link}
          {...register('link', { required: true })}
          className="mb-3 block w-full   rounded border border-black  p-2"
        />
      </label>

      <div className="flex flex-col ">
        <div className="my-5 flex md:mr-5 md:items-center md:justify-start">
          <Image
            className="mr-10"
            src={uploadImgUrl || icon || iconSrc}
            width={48}
            height={48}
            alt="link icon"
          />
          <Button
            variant="outlined"
            className="rounded-none py-1 font-bold "
            onClick={() => setIsOpenUploadModal(true)}
          >
            上傳圖片
          </Button>

          {uploadImgUrl && (
            <input
              type="text"
              name="icon"
              id="icon"
              defaultValue={uploadImgUrl}
              {...register('icon')}
              className="hidden"
            />
          )}

          {isOpenUploadModal && (
            <UploadImageModal
              setShowEdit={setIsOpenUploadModal}
              // eslint-disable-next-line react/jsx-no-bind
              setImgUrl={handleUploadImg}
            />
          )}
        </div>
        <div>
          <label htmlFor="title">
            <p className="mb-2  font-bold">標題 </p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={placeholder.title}
              defaultValue={defaultValue.title}
              {...register('title', { required: true })}
              className="mb-3 block w-full rounded border border-black p-2"
            />
          </label>
          <label htmlFor="subTitle">
            <p className="mb-2  font-bold"> 副標題</p>
            <input
              type="text"
              name="subTitle"
              id="subTitle"
              placeholder={placeholder.subTitle}
              defaultValue={defaultValue.subTitle}
              {...register('subTitle')}
              className="mb-5 block w-full rounded border border-black p-2"
            />
          </label>
          <div className="flex justify-between gap-3">
            <Button
              className="w-1/2   py-2"
              variant="outlined"
              onClick={() =>
                dispatch(
                  setLinkEditorData({
                    isLinkEditorActive: false,
                    activeLinkId: null,
                    activeType: null,
                    uploadImgUrl: null,
                  })
                )
              }
            >
              取消
            </Button>
            <Button className="w-1/2  py-2" submit>
              確認
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
