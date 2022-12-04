import { useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
// import CardDownload from '../../components/features/homepage/CardDownload';
import ZhEnMap from '../../../data/homepageZhEn';
import { TOGGLE_HOMEPAGE_EDITOR } from '../../../constants/constants';
import EditorSectionTitle from './EditorSectionTitle';
import EditorSection from './EditorSection';
import LinkEditor from './LinkEditor';
import Button from '../../common/Button/Button';
import {
  updateHomepageTitle,
  toggleJobInfoPublic,
  setLinkEditorData,
} from '../../../store/actions/homepageActions';
import visibleIcon from '../../../public/icons/visible.svg';
import invisibleIcon from '../../../public/icons/invisible.svg';
import editIcon from '../../../public/icons/edit.svg';

function HomepageEditor() {
  const [activeSection, setActiveSection] = useState();
  const { homepageData } = useSelector((state) => state.homepage);
  const { jobInfo, cardId } = homepageData;
  const dispatch = useDispatch();

  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('auth');
  }

  function handleOpenEditor() {
    dispatch({ type: TOGGLE_HOMEPAGE_EDITOR });
  }

  function handleActiveSection(activeSection) {
    setActiveSection(activeSection);
  }

  function handleToggleJobInfo(toggledJobInfo) {
    dispatch(toggleJobInfoPublic(cardId, token, toggledJobInfo));
  }

  function handleNewLink() {
    dispatch(
      setLinkEditorData({
        isLinkEditorActive: true,
        isNewLink: true,
        activeType: 'LINK',
        activeLinkId: null,
      })
    );
  }

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  function onSubmit(submitData) {
    const { homepageTitle } = submitData;
    dispatch(updateHomepageTitle(cardId, token, homepageTitle));
    handleActiveSection(null);
  }

  function renderJobInfoToggle() {
    return [
      'name',
      'companyName',
      'jobTitle',
      'phoneNumber',
      'city',
      'domain',
    ].map((el) => {
      const { isPublic } = jobInfo[el];
      const zhName = ZhEnMap[el];
      const value = jobInfo[el].content;
      return (
        <div className={`mb-5 ${!isPublic && 'text-gray-300'}`}>
          <h4 className="text-xl font-bold">{zhName}</h4>
          <div className="mb-3 flex">
            <p className="mr-7 w-full border-b border-gray-500  px-3 py-1">
              {value}
            </p>

            <button type="button" onClick={() => handleToggleJobInfo(el)}>
              <Image
                src={isPublic ? visibleIcon : invisibleIcon}
                alt="toggle job info public status"
              />
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <section className="mb-10">
        <EditorSectionTitle>頁面資訊設定</EditorSectionTitle>
        <EditorSection>
          <div className="mb-2 flex justify-between ">
            <h3 className="text-2xl font-bold">頁面標題</h3>
            <button
              className="flex hover:font-bold"
              type="button"
              onClick={() => handleActiveSection('title')}
            >
              <Image
                className="mr-3"
                src={editIcon}
                alt="edit homepage title"
              />
              <p>修改</p>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-full border border-black px-3 py-1"
              defaultValue={homepageData.homepageTitle}
              disabled={activeSection === 'title' ? '' : 'disabled'}
              {...register('homepageTitle', { required: true })}
            />

            {activeSection === 'title' && (
              <div className="mt-10 flex justify-between gap-3">
                <Button submit className="w-1/2 laptop:w-[200px]">
                  確認
                </Button>
                <Button
                  className="w-1/2 laptop:w-[200px]"
                  variant="outlined"
                  onClick={() => handleActiveSection(null)}
                >
                  取消
                </Button>
              </div>
            )}
          </form>
        </EditorSection>
      </section>

      <section className="mb-10">
        <EditorSectionTitle>公開設定</EditorSectionTitle>
        <EditorSection>{renderJobInfoToggle()}</EditorSection>
      </section>

      <section>
        <EditorSectionTitle>連結設定</EditorSectionTitle>
        <EditorSection>
          <Button
            className="mb-10 w-full"
            variant="outlined"
            onClick={() => handleNewLink()}
          >
            新增連結 +
          </Button>

          <LinkEditor />
        </EditorSection>
      </section>

      <Button
        type="button"
        className="mt-10 text-2xl hover:font-bold"
        onClick={() => handleOpenEditor()}
      >
        回到資訊頁面
      </Button>
    </>
  );
}

export default dynamic(() => Promise.resolve(HomepageEditor), {
  ssr: false,
});
