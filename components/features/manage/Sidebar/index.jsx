import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { useClickOutside } from '../../../../hooks/useClickOutsideV2';
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

export default function Sidebar({ onChangeClose, isSidebarMobileMode }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { groupList, tags } = useSelector((state) => state.manage);
  const { activeSection } = useSelector((state) => state.manage);
  const ref = useRef();

  useClickOutside(ref, (e) => {
    const type = e?.target.attributes?.getNamedItem('data-content-type')?.value;
    if (type === 'OPEN_BUTTON') return;
    if (isSidebarMobileMode) {
      e.stopPropagation();
      onChangeClose(e);
    }
  });

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
    <div
      className="absolute z-30 h-[80vh] w-9/12 rounded-xl rounded-tl-none bg-white p-5 laptop:static laptop:h-full laptop:max-h-full laptop:w-full"
      ref={ref}
    >
      <SearchBar />
      <SidebarHeader
        className="mb-8"
        button
        onClick={() => handleSetPortfolioActive()}
        active={activeSection.type === manageActiveSectionType.PORTFOLIO}
      >
        ????????????
      </SidebarHeader>

      <section className="mb-8">
        <SidebarHeader>???????????????</SidebarHeader>

        <ul className="pl-4 pr-6 ">{renderGroupList()}</ul>
        <button
          type="button"
          className="  w-full pl-5 pr-6 text-left text-lg	 text-gray-400 hover:font-bold"
          onClick={() => handleOpenAddNewGroupModal()}
        >
          + ????????????
        </button>
      </section>

      <section>
        <SidebarHeader>??????</SidebarHeader>

        <ul className="flex flex-wrap gap-2  px-3 ">
          {tags && tags.map((tag) => <SectionTag key={tag}>{tag}</SectionTag>)}
        </ul>
      </section>
    </div>
  );
}
