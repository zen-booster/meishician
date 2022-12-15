import { FaFolderOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getCookie } from 'cookies-next';
import BookmarkCardList from '../../components/features/manage/BookmarkCardList';
import PortfolioCardList from '../../components/features/manage/PortfolioCardList';

import Sidebar from '../../components/features/manage/Sidebar';
import EditBookmarkModal from '../../components/features/manage/Modal/EditBookmarkModal';
import DeleteBookmarkModal from '../../components/features/manage/Modal/DeleteBookmarkModal';
import AddNewGroupModal from '../../components/features/manage/Modal/AddNewGroupModal';
import DeleteGroupModal from '../../components/features/manage/Modal/DeleteGroupModal';
import RenameGroupModal from '../../components/features/manage/Modal/RenameGroupModal';
import ShowCardModal from '../../components/features/manage/Modal/ShowCardModal';
import QrCodeModal from '../../components/features/manage/Modal/QrCodeModal';

import { useWindowWide } from '../../hooks/useWindowWide';
import {
  manageActiveSectionType,
  manageModalType,
} from '../../store/reducers/manageReducer';

import { setInitData, setBaseUrl } from '../../store/actions/manageActions';

export default function Manage() {
  const router = useRouter();
  const wide = useWindowWide();
  const baseUrl =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const dispatch = useDispatch();
  // const { token, isLogin } = useSelector((state) => state.loginStatus);
  // const loginStatus = useSelector((state) => state.loginStatus);
  // console.log(token, isLogin, loginStatus);

  const { isModalOpen, modal, activeSection } = useSelector(
    (state) => state.manage
  );
  const { type: activeType } = activeSection;
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleSidebarActiveClick = () => {
    if (wide < 996) setIsSidebarActive((prev) => !prev);
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
    if (getCookie('auth')) {
      const token = getCookie('auth');
      dispatch(setInitData(token));
      dispatch(setBaseUrl(baseUrl));
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (wide < 996) setIsSidebarActive(false);
    if (wide >= 996) setIsSidebarActive(true);
  }, [wide]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="relative flex min-h-screen">
        {renderModal()}
        <aside
          className={`${isSidebarActive ? 'block' : 'hidden'} 
        absolute z-20 
        w-3/4
        bg-white
        p-5
        drop-shadow-xl
        laptop:static
        laptop:basis-2/5 xl:basis-1/4`}
        >
          <Sidebar />
        </aside>
        <section className=" basis-full bg-gray-200 p-10 laptop:basis-3/5 xl:basis-3/4">
          {renderCardList()}
        </section>
        <button
          type="button"
          onClick={() => handleSidebarActiveClick()}
          className="fixed bottom-3 right-3 flex h-14 w-14 items-center  justify-center rounded-full bg-white drop-shadow-xl laptop:hidden"
        >
          <FaFolderOpen />
        </button>
      </main>
    </DndProvider>
  );
}
