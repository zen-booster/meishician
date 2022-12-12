// import Image from 'next/image';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/legacy/image';
import {
  SET_HOMEPAGE_INFO,
  TOGGLE_HOMEPAGE_EDITOR,
  SET_AUTHOR,
} from '../../constants/constants';
import HomepageService from '../../services/homepage.services';

import HomepageEditor from '../../components/features/homepage-editor';
import Button from '../../components/common/Button/Button';

import { b64toBlob } from '../../utils/b64toBlob';

import { wrapper } from '../../store/store';
import ZhEnMap from '../../data/homepageZhEn';
import linkTypeIconMap from '../../data/linkTypeIconMap';
import Loader from '../../components/common/Loader/Loader';
import editIcon from '../../public/icons/edit.svg';

function Homepage() {
  const { isAuthor, isEditorOpen } = useSelector((state) => state.homepage);
  const { isLoading } = useSelector((state) => state.loaderStatus);

  const { isLogin, token } = useSelector((state) => state.loginStatus);

  const { homepage } = useSelector((state) => state);
  const cardImageData = homepage?.homepageData?.cardImageData || '';
  const layoutDirection = homepage?.homepageData?.layoutDirection || '';

  const { front: frontCardImageData, back: backCardImageData } = cardImageData;

  const data = useSelector((state) => state.homepage.homepageData);
  const jobInfo = data?.jobInfo;
  const homepageLink = data?.homepageLink;
  const cardId = data?.cardId;
  const homepageTitle = data?.homepageTitle;
  const dispatch = useDispatch();

  function handleOpenEditor() {
    dispatch({ type: TOGGLE_HOMEPAGE_EDITOR });
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
            `card${index}.jpg`
          );
        });
    }
  };

  const [isDisplayFrontCard, setIsDisplayFrontCard] = useState(true);
  function handleDisplayCard() {
    setIsDisplayFrontCard((prev) => (backCardImageData ? !prev : true));
  }

  useEffect(() => {
    async function handleIsAuthor() {
      if (cardId) {
        const res = await HomepageService.getHomepageInfo(cardId, token);
        if (res?.data?.isAuthor === true) {
          dispatch({ type: SET_AUTHOR });
        }
      }
    }

    handleIsAuthor();
  }, []);

  function renderJobInfo() {
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
          className="mb-6 flex items-center bg-main-02 py-2 px-5 last:mb-0 laptop:rounded-xl"
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
            <h3 className="font-bold text-main-01">
              {title && <p> {el.title}</p>}
            </h3>
            {subTitle && <h4 className=" text-white">{subTitle}</h4>}
          </div>
        </a>
      );
    });
  }

  const cardSize =
    layoutDirection === 'horizontal'
      ? { width: 500, height: 250 }
      : { width: 250, height: 400 };

  let role;
  if (isAuthor === true && isLogin === true) {
    role = 'author';
  } else if (isAuthor === false && isLogin === true) {
    role = 'member';
  } else {
    role = 'guest';
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoading && <Loader />}
      <div>
        <h1 className=" bg-main-02 py-11 text-center text-h3 font-bold text-main-01">
          {isEditorOpen ? '個人頁面編輯' : homepageTitle || '名片資訊頁面'}
        </h1>
        <div className="mx-auto  max-w-container bg-gray-100 py-14 px-5 laptop:px-32 xl:px-52">
          {isEditorOpen ? (
            <HomepageEditor />
          ) : (
            <>
              <div className="mx-auto mb-14 flex max-w-[600px] flex-col">
                <button
                  type="button"
                  onClick={() => handleDisplayCard()}
                  className="mb-4"
                >
                  {(frontCardImageData || backCardImageData) && (
                    <Image
                      className="rounded-lg  object-cover	"
                      src={
                        isDisplayFrontCard
                          ? frontCardImageData
                          : backCardImageData
                      }
                      width={cardSize.width}
                      height={cardSize.height}
                      alt={isDisplayFrontCard ? 'front card' : 'back card'}
                      layout="responsive"
                    />
                  )}
                </button>

                <div className="flex justify-between gap-5">
                  {role === 'author' && (
                    <Button variant="outlined" className="w-1/2 py-1 text-lg">
                      <p>編輯名片</p>
                    </Button>
                  )}

                  {role === 'member' && (
                    <Button variant="outlined" className="w-1/2 py-1 text-lg">
                      <p>收藏名片</p>
                    </Button>
                  )}

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
                {isAuthor && (
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
              {homepageLink && <ul>{renderHomepageLink()}</ul>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { cardId } = context.params;

    try {
      const apiResponse = await HomepageService.getHomepageInfo(cardId);
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
