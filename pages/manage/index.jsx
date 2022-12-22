import { FaFolderOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { getCookie } from 'cookies-next';
import BookmarkCardList from '../../components/features/manage/BookmarkCardList';
import PortfolioCardList from '../../components/features/manage/PortfolioCardList';
import Space from '../../components/common/Space/Space';
import Sidebar from '../../components/features/manage/Sidebar';
import EditBookmarkModal from '../../components/features/manage/Modal/EditBookmarkModal';
import DeleteBookmarkModal from '../../components/features/manage/Modal/DeleteBookmarkModal';
import AddNewGroupModal from '../../components/features/manage/Modal/AddNewGroupModal';
import DeleteGroupModal from '../../components/features/manage/Modal/DeleteGroupModal';
import RenameGroupModal from '../../components/features/manage/Modal/RenameGroupModal';
import ShowCardModal from '../../components/features/manage/Modal/ShowCardModal';
import QrCodeModal from '../../components/features/manage/Modal/QrCodeModal';
import DeletePortfolioModal from '../../components/features/manage/Modal/DeletePortfolioModal';
import DeleteScratchModal from '../../components/features/manage/Modal/DeleteScratchModal';

import { useWindowWide } from '../../hooks/useWindowWide';
import {
  manageActiveSectionType,
  manageModalType,
} from '../../store/reducers/manageReducer';

import {
  setInitData,
  setBaseUrl,
  resetManage,
} from '../../store/actions/manageActions';

export default function Manage({ queryType }) {
  const router = useRouter();
  const wide = useWindowWide();
  const baseUrl =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const dispatch = useDispatch();

  const { isModalOpen, modal, activeSection } = useSelector(
    (state) => state.manage
  );
  const { type: activeType } = activeSection;
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleSidebarActiveClick = () => {
    if (wide < 996) setIsSidebarActive((prev) => !prev);
  };

  const handleSideClose = () => {
    if (wide < 996) setIsSidebarActive(false);
  };

  function renderModal() {
    if (isModalOpen) {
      switch (modal.type) {
        case manageModalType.EDIT_BOOKMARK: {
          return <EditBookmarkModal />;
        }
        case manageModalType.DELETE_BOOKMARK: {
          return <DeleteBookmarkModal />;
        }
        case manageModalType.ADD_GROUP: {
          return <AddNewGroupModal />;
        }
        case manageModalType.DELETE_GROUP: {
          return <DeleteGroupModal />;
        }
        case manageModalType.RENAME_GROUP: {
          return <RenameGroupModal />;
        }

        case manageModalType.DELETE_PORTFOLIO: {
          return <DeletePortfolioModal />;
        }

        case manageModalType.DELETE_SCRATCH: {
          return <DeleteScratchModal />;
        }
        case manageModalType.SHOW_CARD: {
          return <ShowCardModal />;
        }
        case manageModalType.SHOW_QRCODE: {
          return <QrCodeModal />;
        }
        default: {
          return <div />;
        }
      }
    }
    return <div />;
  }

  function renderCardList() {
    if (activeType === manageActiveSectionType.PORTFOLIO) {
      return <PortfolioCardList />;
    }
    return <BookmarkCardList />;
  }

  useEffect(() => {
    dispatch(resetManage());
    if (getCookie('auth')) {
      const token = getCookie('auth');

      if (queryType === 'portfolio') {
        dispatch(setInitData(token, null, 1, null, 'portfolio'));
      } else {
        dispatch(setInitData(token));
      }
      dispatch(setBaseUrl(baseUrl));
    } else {
      router.push('/login');
    }
  }, []);

  const [isSidebarMobileMode, setIsSidebarMobileMode] = useState(false);

  useEffect(() => {
    if (wide < 996) setIsSidebarActive(false);
    if (wide >= 996) setIsSidebarActive(true);
  }, [wide]);

  useEffect(() => {
    if (wide < 996 && isSidebarActive) {
      setIsSidebarMobileMode(true);
    } else {
      setIsSidebarMobileMode(false);
    }
  }, [wide, isSidebarActive, isSidebarMobileMode]);

  return (
    <>
      <Space />
      <DndProvider backend={HTML5Backend}>
        <main className="relative flex h-full min-h-screen">
          {renderModal()}
          <aside
            className={`${isSidebarActive ? 'block' : 'hidden'} 
        absolute z-20 
        w-full
        drop-shadow-xl
        laptop:static
        laptop:basis-2/5 xl:basis-1/4`}
          >
            <Sidebar onChangeClose={handleSideClose} isSidebarMobileMode />

            {isSidebarMobileMode && (
              <div className="absolute top-0  h-screen w-full bg-black opacity-50" />
            )}
          </aside>

          <section
            className={`
          basis-full bg-gray-200 p-10 laptop:basis-3/5 xl:basis-3/4
          ${isSidebarMobileMode && 'pointer-events-none'}
          `}
          >
            {renderCardList()}
          </section>
        </main>
      </DndProvider>
      {!isSidebarActive && (
        <button
          type="button"
          data-content-type="OPEN_BUTTON"
          onClick={(e) => handleSidebarActiveClick(e)}
          className="fixed bottom-3 right-3 flex h-14 w-14 items-center  justify-center rounded-full bg-white drop-shadow-xl laptop:hidden"
        >
          <FaFolderOpen />
        </button>
      )}
    </>
  );
}

export const getServerSideProps = async (context) => {
  let queryType = context.query.type;
  queryType = queryType ?? 'bookmark';
  return { props: { queryType } };
};
