import { useDispatch, useSelector } from 'react-redux';
import SectionTag from '../SectionTag';
import SidebarHeader from './SidebarHeader';
import SearchBar from './SearchBar';
import SectionListItem from './SectionListItem';
import ListItemDnD from './ListItemDnD';
import {
  setPortfolioActive,
  openModal,
} from '../../../../store/actions/manageActions';
import {
  manageActiveSectionType,
  manageModalType,
} from '../../../../store/reducers/manageReducer';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { groupList, tags } = useSelector((state) => state.manage);
  const { activeSection } = useSelector((state) => state.manage);

  function handleOpenAddNewGroupModal() {
    dispatch(
      openModal({
        type: manageModalType.ADD_GROUP,
      })
    );
  }

  function handleSetPortfolioActive() {
    dispatch(setPortfolioActive(token));
  }

  function renderGroupList() {
    return groupList.map((group, index) => {
      const groupId = group._id;
      const active = !!(
        activeSection.type === manageActiveSectionType.BOOKMARK &&
        groupId === activeSection.activeGroupId
      );

      return (
        <ListItemDnD key={group._id} id={group._id} index={index}>
          <SectionListItem key={group._id} groupId={group._id} active={active}>
            {group.name}
          </SectionListItem>
        </ListItemDnD>
      );
    });
  }

  return (
    <>
      <SearchBar />
      <SidebarHeader
        className="mb-8"
        active={activeSection.type === manageActiveSectionType.PORTFOLIO}
      >
        <button type="button" onClick={() => handleSetPortfolioActive()}>
          我的名片
        </button>
      </SidebarHeader>

      <section className="mb-8">
        <SidebarHeader>收藏的名片</SidebarHeader>

        <ul className=" pl-4 pr-6">
          {renderGroupList()}
          <button
            type="button"
            className=" py-3 pl-1 text-xl	 text-gray-400 hover:font-bold"
            onClick={() => handleOpenAddNewGroupModal()}
          >
            + 新增群組
          </button>
        </ul>
      </section>

      <section>
        <SidebarHeader>標籤</SidebarHeader>

        <ul className="flex flex-wrap gap-2  px-3 ">
          {tags && tags.map((tag) => <SectionTag>{tag}</SectionTag>)}
        </ul>
      </section>
    </>
  );
}
