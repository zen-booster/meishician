import { useState } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
// import CardDownload from '../../components/features/homepage/CardDownload';
import ZhEnMap from '../../../../data/homepageZhEn';
import { TOGGLE_HOMEPAGE_EDITOR } from '../../../../constants/constants';
import EditorSectionTitle from './EditorSectionTitle';
import EditorSection from './EditorSection';
import LinkEditor from './LinkEditor';
import Button from '../../../common/Button/Button';
import {
  updateHomepageTitle,
  toggleJobInfoPublic,
  setLinkEditorData,
} from '../../../../store/actions/homepageActions';
import visibleIcon from '../../../../public/icons/visible.svg';
import invisibleIcon from '../../../../public/icons/invisible.svg';
import editIcon from '../../../../public/icons/edit.svg';

function HomepageEditor() {
  const [activeSection, setActiveSection] = useState();
  const { token } = useSelector((state) => state.loginStatus);
  const { homepageData } = useSelector((state) => state.homepage);
  const { jobInfo, cardId } = homepageData;
  const dispatch = useDispatch();

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
    // formState: { errors },
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
        <div className={`mb-5 ${!isPublic && 'text-gray-300'}`} key={el}>
          <h4 className="font-bold">{zhName}</h4>
          <div className="mb-3 flex text-xl">
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
        <EditorSectionTitle>??????????????????</EditorSectionTitle>
        <EditorSection>
          <div className="mb-2 flex justify-between ">
            <h3 className="font-bold">????????????</h3>
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
              <p>??????</p>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text-lg"
              className="w-full rounded border border-black px-3 py-1"
              defaultValue={homepageData.homepageTitle}
              disabled={activeSection === 'title' ? '' : 'disabled'}
              {...register('homepageTitle', { required: true })}
            />

            {activeSection === 'title' && (
              <div className="mt-10 flex justify-between gap-5">
                <Button
                  className="w-1/2"
                  variant="outlined"
                  onClick={() => handleActiveSection(null)}
                >
                  ??????
                </Button>
                <Button submit className="w-1/2">
                  ??????
                </Button>
              </div>
            )}
          </form>
        </EditorSection>
      </section>

      <section className="mb-10">
        <EditorSectionTitle>????????????</EditorSectionTitle>
        <EditorSection>{renderJobInfoToggle()}</EditorSection>
      </section>

      <section>
        <EditorSectionTitle>????????????</EditorSectionTitle>
        <EditorSection>
          <Button
            className="mb-10 w-full"
            variant="outlined"
            onClick={() => handleNewLink()}
          >
            ???????????? +
          </Button>

          <LinkEditor />
        </EditorSection>
      </section>

      <Button
        type="button"
        className="mx-auto mt-10 block text-2xl hover:font-bold"
        onClick={() => handleOpenEditor()}
      >
        ??????????????????
      </Button>
    </>
  );
}

export default dynamic(() => Promise.resolve(HomepageEditor), {
  ssr: false,
});
