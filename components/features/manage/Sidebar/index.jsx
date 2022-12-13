import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import SectionTag from '../SectionTag';
import SidebarHeader from './SidebarHeader';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem';
import {
  setInitData,
  setGroupListActive,
  openModal,
  toggleDropdown,
  setGroupOrder,
  updateGroupOrderApi,
  setBookmarkGroup,
} from '../../../../store/actions/manageActions';
import {
  manageActiveSectionType,
  manageDropdownType,
  manageModalType,
} from '../../../../store/reducers/manageReducer';

import ItemTypes from '../ItemTypes';

function ListItemDnD({ id, children, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const [, listItemDrop] = useDrop({
    accept: ItemTypes.LIST_ITEM,
    item: { id, groupId: id },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      dispatch(setGroupOrder(dragIndex, hoverIndex));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    drop(item) {
      dispatch(updateGroupOrderApi(token, id, item.index));
    },
  });

  const [{ isCardHover }, cardDrop] = useDrop({
    accept: ItemTypes.CARD,
    item: { id, groupId: id },
    drop: async (item, monitor) => {
      if (monitor.didDrop) {
        const groupId = id;
        const { cardId } = monitor.getItem();
        console.log(groupId);

        dispatch(setBookmarkGroup(token, groupId, cardId));
      }
    },
    collect: (monitor) => ({
      isCardHover: !!monitor.isOver(),
    }),
  });

  const [{ isListItemDragging }, listItemDrag] = useDrag({
    type: ItemTypes.LIST_ITEM,
    item: { id, index },
    collect: (monitor) => ({
      isListItemDragging: monitor.isDragging(),
    }),
  });

  const opacity = isListItemDragging ? 0.3 : 1;
  listItemDrag(listItemDrop(cardDrop(ref)));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      className={`mb-2 rounded-3xl border bg-slate-100 p-2 ${
        isCardHover && 'bg-[#A8D8B9]'
      }`}
    >
      {children}
    </div>
  );
}

function SectionListItem({ children, groupId, active }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown, defaultGroupId } = useSelector(
    (state) => state.manage
  );
  const isCurrentDropdown =
    isDropdownOpen &&
    dropdown.activeGroupId === groupId &&
    dropdown.type === manageDropdownType.GROUP;

  function handleSetActive() {
    if (token) dispatch(setGroupListActive(token, groupId));
  }

  const baseStyle =
    'flex justify-between py-1 text-lg font-bold px-4 rounded-2xl relative';
  const statusStyle = active
    ? 'bg-main-01 text-white'
    : 'bg-white text-main-01';

  function handleGroupDropdown() {
    if (defaultGroupId !== groupId)
      dispatch(
        toggleDropdown({
          type: manageDropdownType.GROUP,
          activeGroupId: groupId,
        })
      );
  }

  function handleOpenDeleteGroupModal() {
    dispatch(
      openModal({
        type: manageModalType.DELETE_GROUP,
        activeGroupId: groupId,
      })
    );
  }

  function handleOpenRenameGroupModal() {
    dispatch(
      openModal({
        type: manageModalType.RENAME_GROUP,
        activeGroupId: groupId,
      })
    );
  }

  return (
    <li className={`${baseStyle} ${statusStyle}`}>
      <button className="pr-3" type="button" onClick={() => handleSetActive()}>
        {children}
      </button>

      <button
        className="flex items-center "
        type="button"
        onClick={() => handleGroupDropdown()}
      >
        {groupId !== defaultGroupId && (
          <BiDotsHorizontalRounded className="h-[30px] w-[30px]" />
        )}
      </button>
      {isCurrentDropdown && (
        <div className="absolute top-14 right-3 z-10 text-base font-normal">
          <DropdownMenu>
            <DropdownMenuItem>
              <button
                type="button"
                onClick={() => handleOpenRenameGroupModal()}
              >
                群組更名
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem warning>
              <button
                type="button"
                onClick={() => handleOpenDeleteGroupModal()}
              >
                刪除群組
              </button>
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      )}
    </li>
  );
}

export default function BookmarkSidebar() {
  const dispatch = useDispatch();
  const { token, isLogin } = useSelector((state) => state.loginStatus);
  const { groupList, tags } = useSelector((state) => state.manage);
  const { activeSection } = useSelector((state) => state.manage);

  useEffect(() => {
    if (isLogin && !!token) dispatch(setInitData(token));
  }, [isLogin, token]);

  function handleOpenAddNewGroupModal() {
    dispatch(
      openModal({
        type: manageModalType.ADD_GROUP,
      })
    );
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
      <SidebarHeader className="mb-11">我的名片</SidebarHeader>

      <section className="mb-11">
        <SidebarHeader>收藏的名片</SidebarHeader>

        <ul className=" pl-4 pr-6">
          {renderGroupList()}
          <button
            type="button"
            className=" py-3 pl-1 text-xl  text-gray-400 hover:font-bold"
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
