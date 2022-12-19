import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { saveAs } from 'file-saver';
import { motion } from 'framer-motion';
import { wrapper } from '../../store/store';
import {
  SET_HOMEPAGE_INFO,
  TOGGLE_HOMEPAGE_EDITOR,
} from '../../constants/constants';
import HomepageService from '../../services/homepage.services';
import { saveBookmark } from '../../store/actions/homepageActions';

import Space from '../../components/common/Space/Space';
import Loader from '../../components/common/Loader/Loader';
import HomepageEditor from '../../components/features/homepage-editor';
import Button from '../../components/common/Button/Button';

import ZhEnMap from '../../data/homepageZhEn';
import linkTypeIconMap from '../../data/linkTypeIconMap';
import editIcon from '../../public/icons/edit.svg';

import { b64toBlob } from '../../utils/b64toBlob';

function Homepage() {
  const router = useRouter();
  const { isEditorOpen } = useSelector((state) => state.homepage);
  const { token } = useSelector((state) => state.loginStatus);

  const { isLoading } = useSelector((state) => state.loaderStatus);

  const { homepage } = useSelector((state) => state);
  const cardImageData = homepage?.homepageData?.cardImageData || '';
  const layoutDirection = homepage?.homepageData?.layoutDirection || '';

  const { front: frontCardImageData, back: backCardImageData } = cardImageData;

  const data = useSelector((state) => state.homepage.homepageData);
  const jobInfo = data?.jobInfo;
  const homepageLink = data?.homepageLink;
  const cardId = data?.cardId;
  const homepageTitle = data?.homepageTitle;
  const role = data?.role;

  const dispatch = useDispatch();

  function handleOpenEditor() {
    dispatch({ type: TOGGLE_HOMEPAGE_EDITOR });
  }

  function handleSetBookmark() {
    dispatch(saveBookmark(cardId, token));
  }

  const saveFile = (b64DataArr) => {
    if (typeof window !== 'undefined') {
      b64DataArr
        .filter((item) => !!item)
        .forEach((base64, index) => {
          const contentType = 'image/png';
          const blob = b64toBlob(base64, contentType);
          saveAs(
            new Blob([blob], { type: 'image/png;base64' }),
            `card${index}.png`
          );
        });
    }
  };

  const [isDisplayFrontCard, setIsDisplayFrontCard] = useState(true);
  function handleDisplayCard() {
    setIsDisplayFrontCard((prev) => (backCardImageData ? !prev : true));
  }

  function renderJobInfo() {
    return [
      'name',
      'companyName',
      'jobTitle',
      'phoneNumber',
      'city',
      'domain',
    ].map((el) => {
      const isPublic = !!jobInfo?.[el]?.content;
      const zhName = ZhEnMap[el];
      const value = jobInfo?.[el]?.content;
      return (
        isPublic && (
          <tr key={value}>
            <td className="font-bold laptop:p-2">{zhName}:</td>
            <td className="pl-3">{value}</td>
          </tr>
        )
      );
    });
  }

  function renderHomepageLink() {
    return homepageLink.map((el) => {
      const { type, title, subTitle, link, icon, _id: linkId } = el;
      const iconSrc = icon || linkTypeIconMap[type].src;

      return (
        <a
          key={linkId}
          className="border-b-1 mb-6 flex  items-center border-b border-gray-700 px-3 pb-1 last:mb-0 laptop:w-full "
          href={type === 'EMAIL' ? `mailto:${link}` : link}
        >
          <div className="mr-3">
            <div
              style={{
                backgroundImage: `url(${iconSrc})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                width: 48,
                height: 48,
              }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-main-01">
              {title && <p> {el.title}</p>}
            </h3>

            {subTitle && <h4 className=" text-gray-500">{subTitle}</h4>}
          </div>
        </a>
      );
    });
  }

  const cardSize =
    layoutDirection === 'horizontal'
      ? { width: 648, height: 360 }
      : { width: 360, height: 648 };

  function renderCardButton() {
    switch (role) {
      case 'author':
        return (
          <Button
            variant="outlined"
            className="mr-5 w-1/2 py-1 text-lg"
            onClick={() => {
              router.push(`/canvas-editor/${cardId}`);
            }}
          >
            <p>編輯名片</p>
          </Button>
        );
      case 'nonBookmarkedMember':
        return (
          <Button
            onClick={() => handleSetBookmark()}
            variant="outlined"
            className="mr-5 w-1/2 py-1 text-lg"
          >
            <p>收藏名片</p>
          </Button>
        );
      case 'bookmarkedMember':
        return (
          <Button
            variant="outlined"
            className="mr-5 w-1/2 py-1 text-lg"
            disabled
          >
            <p>名片已收藏</p>
          </Button>
        );
      default:
        return <div />;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading && <Loader />}
      <div>
        <Space />
        <h1 className=" bg-main-02 py-5 text-center text-h4 font-bold text-main-01 laptop:py-11 laptop:text-h3">
          {isEditorOpen ? '個人頁面編輯' : homepageTitle || '名片資訊頁面'}
        </h1>
        <div className="mx-auto  max-w-container bg-gray-100 py-14 px-5 laptop:px-32 xl:px-52">
          {isEditorOpen ? (
            <HomepageEditor />
          ) : (
            <>
              <div className="mx-auto mb-14 flex max-w-[600px] flex-col">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => handleDisplayCard()}
                  className="mb-4"
                >
                  {(frontCardImageData || backCardImageData) && (
                    <Image
                      className={`rounded-lg ${
                        layoutDirection === 'horizontal' && 'w-full'
                      } ${layoutDirection === 'vertical' && 'mx-auto h-full'}`}
                      src={
                        isDisplayFrontCard
                          ? frontCardImageData
                          : backCardImageData
                      }
                      width={cardSize.width}
                      height={cardSize.height}
                      alt={isDisplayFrontCard ? 'front card' : 'back card'}
                    />
                  )}
                </motion.button>

                <div className="flex justify-between">
                  {renderCardButton()}
                  <Button
                    variant="outlined"
                    className={`py-1 text-lg ${
                      role !== 'guest' ? 'w-1/2' : 'w-full'
                    }`}
                    onClick={() =>
                      saveFile([frontCardImageData, backCardImageData])
                    }
                  >
                    <p>下載名片(.png)</p>
                  </Button>
                </div>
              </div>

              <div className="mx-auto flex  items-center bg-main-02 px-4 py-2 laptop:rounded-xl">
                <h2 className="mr-auto text-h4 font-bold text-main-01">
                  個人資訊Info
                </h2>
                {role === 'author' && (
                  <button
                    className="flex hover:font-bold"
                    type="button"
                    onClick={handleOpenEditor}
                  >
                    <p className="mr-3">修改資訊</p>
                    <Image src={editIcon} alt="edit homepage info" />
                  </button>
                )}
              </div>
              {jobInfo && (
                <div className="py-10 px-5">
                  <table className="laptop:text-xl">
                    <tbody>{renderJobInfo()}</tbody>
                  </table>
                </div>
              )}
              {homepageLink && (
                <>
                  <div className="mx-auto flex  items-center bg-main-02 px-4 py-2 laptop:rounded-xl">
                    <h2 className="mr-auto text-h4 font-bold text-main-01">
                      個人連結
                    </h2>
                  </div>

                  <ul className="flex flex-col py-10 ">
                    {renderHomepageLink()}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, res } = context;
    const { cardId } = context.params;

    const token = getCookie('auth', { req, res });
    // token = JSON.parse(JSON.stringify(token));

    try {
      const apiResponse = await HomepageService.getHomepageInfo(cardId, token);
      store.dispatch({ type: SET_HOMEPAGE_INFO, payload: apiResponse.data });
      return { props: {} };
    } catch {
      return {
        notFound: true,
      };
    }
  }
);

export default Homepage;
