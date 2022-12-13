import { FaFolderOpen } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import CardList from '../../components/features/manage/CardList';
import Sidebar from '../../components/features/manage/Sidebar';
import EditBookmarkModal from '../../components/features/manage/Modal/EditBookmarkModal';
import DeleteBookmarkModal from '../../components/features/manage/Modal/DeleteBookmarkModal';
import AddNewGroupModal from '../../components/features/manage/Modal/AddNewGroupModal';
import DeleteGroupModal from '../../components/features/manage/Modal/DeleteGroupModal';
import RenameGroupModal from '../../components/features/manage/Modal/RenameGroupModal';

import { useWindowWide } from '../../hooks/useWindowWide';
import { manageModalType } from '../../store/reducers/manageReducer';

export default function Manage() {
  const wide = useWindowWide();
  const { isModalOpen, modal } = useSelector((state) => state.manage);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const handleSidebarActiveClick = () => {
    if (wide < 996) setIsSidebarActive((prev) => !prev);
  };

  useEffect(() => {
    if (wide < 996) setIsSidebarActive(false);
    if (wide >= 996) setIsSidebarActive(true);
  }, [wide]);

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
        default: {
          return <div />;
        }
      }
    }
    return <div />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="relative flex min-h-screen">
        {renderModal()}
        <aside
          className={`${isSidebarActive ? 'block' : 'hidden'} 
        absolute z-20 min-h-screen 
        w-3/4
        bg-white
        p-5
        drop-shadow-xl
        laptop:static
        laptop:basis-2/5 xl:basis-1/4`}
        >
          <Sidebar />
        </aside>

        <CardList />

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
