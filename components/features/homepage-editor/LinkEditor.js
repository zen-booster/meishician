import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { pickBy } from 'lodash';

import Image from 'next/image';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import linkTypeIconMap from '../../../data/linkTypeIconMap';
import Button from '../../common/Button/Button';
import UploadImageModal from '../../common/UploadImageModal';
import LinkDnDContainer from './LinkDnDContainer';

import {
  setLinkEditorData,
  updateLinkInfo,
  deleteLink,
  addNewLink,
} from '../../../store/actions/homepageActions';
import editIcon from '../../../public/icons/edit.svg';
import trashBinIcon from '../../../public/icons/trash-bin.svg';

function LinkContainer({ children }) {
  return (
    <div className="mb-3 flex border border-black">
      <div className="w-[20px] min-w-[20px] shrink-0 bg-main-02" />
      <div className="shrink-1 w-full">{children}</div>
    </div>
  );
}

function NewLinkWrapper({ children }) {
  return (
    <div className="mb-3 flex border border-black">
      <div className="flex w-[30px]	items-center justify-center bg-main-02" />
      <div className="">{children}</div>
    </div>
  );
}

function DisplayMode({ title, subTitle, link, iconSrc, onOpenEditorClick }) {
  function truncateString(str, num) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    }
    return str;
  }
  return (
    <div className="flex px-4 py-2">
      <div className="mr-3 flex items-center justify-center">
        <div
          style={{
            backgroundImage: `url(${iconSrc})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: 40,
            height: 40,
          }}
        />
      </div>
      <div className="shrink-1 mr-auto">
        <h3 className="break-all font-bold text-main-01">{title || ''}</h3>
        <h4 className=" break-all text-main-02">{subTitle && subTitle}</h4>
        <p className="flex flex-wrap break-all text-gray-500">
          {truncateString(link, 25)}
        </p>
      </div>
      <div className="flex w-5 shrink-0 justify-center">
        <button type="button" onClick={onOpenEditorClick}>
          <Image src={editIcon} alt="edit link" />
        </button>
      </div>
    </div>
  );
}

function EditorMode({ idData, linkData, isNewLink }) {
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
      className="py-2 px-4  laptop:py-4 laptop:px-14"
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
            <option value={linkType}>{linkType}</option>
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
        <p className="mb-2 text-xl font-bold"> 連結網址</p>
        <input
          type="text"
          name="link"
          id="link"
          placeholder={placeholder.link}
          defaultValue={defaultValue.link}
          {...register('link', { required: true })}
          className="mb-3 block w-full  border border-black p-2"
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
            <p className="mb-2 text-xl font-bold">標題 </p>
            <input
              type="text"
              name="title"
              id="title"
              placeholder={placeholder.title}
              defaultValue={defaultValue.title}
              {...register('title', { required: true })}
              className="mb-3 block w-full border border-black p-2"
            />
          </label>
          <label htmlFor="subTitle">
            <p className="mb-2 text-xl font-bold"> 副標題</p>
            <input
              type="text"
              name="subTitle"
              id="subTitle"
              placeholder={placeholder.subTitle}
              defaultValue={defaultValue.subTitle}
              {...register('subTitle')}
              className="mb-5 block w-full border border-black p-2"
            />
          </label>
          <div className="flex justify-between gap-3">
            <Button className="w-1/2  py-2" submit>
              確認
            </Button>
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
          </div>
        </div>
      </div>
    </form>
  );
}

function LinkEditor() {
  const { homepageData, linkEditor } = useSelector((state) => state.homepage);
  const { token } = useSelector((state) => state.loginStatus);
  console.log(token);
  const { cardId, homepageLink } = homepageData;
  const { isLinkEditorActive, isNewLink, activeLinkId } = linkEditor;
  const isNewLinkActive = isLinkEditorActive && isNewLink;
  const dispatch = useDispatch();

  function handleOpenLinkEditor(activeLinkId, activeType) {
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: true,
        isNewLink: false,
        activeLinkId,
        activeType,
      })
    );
  }

  function handleCloseLinkEditor() {
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: false,
        isNewLink: false,
        activeLinkId: null,
        activeType: null,
        uploadImgUrl: null,
      })
    );
  }

  function renderHomepageLink(cardId, token) {
    return homepageLink.map((linkData, index) => {
      const { type, title, subTitle, link, icon, _id: linkId } = linkData;
      const iconSrc = icon || linkTypeIconMap[type].src;
      const isEditorModeOn = isLinkEditorActive && activeLinkId === linkId;
      return (
        <LinkDnDContainer
          key={linkId}
          linkId={linkId}
          index={index}
          cardId={cardId}
          token={token}
        >
          <LinkContainer>
            {isEditorModeOn ? (
              <EditorMode
                idData={{ cardId, linkId, token }}
                linkData={{ title, subTitle, link, icon }}
                onCloseEditorClick={() => handleCloseLinkEditor()}
              />
            ) : (
              <DisplayMode
                {...{ type, title, subTitle, link, cardId, token, iconSrc }}
                onOpenEditorClick={() => handleOpenLinkEditor(linkId, type)}
              />
            )}
          </LinkContainer>
        </LinkDnDContainer>
      );
    });
  }

  return (
    <>
      {isNewLinkActive && (
        <NewLinkWrapper>
          <EditorMode isNewLink idData={{ cardId, token }} />
        </NewLinkWrapper>
      )}
      <DndProvider backend={HTML5Backend}>
        {renderHomepageLink(cardId, token)}
      </DndProvider>
    </>
  );
}

export default LinkEditor;
