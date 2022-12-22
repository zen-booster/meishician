import { useDispatch, useSelector } from 'react-redux';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useRef } from 'react';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem';
import {
  openModal,
  toggleDropdown,
  setGroupListActive,
  closeDropdown,
} from '../../../../store/actions/manageActions';
import {
  manageDropdownType,
  manageModalType,
} from '../../../../store/reducers/manageReducer';
import { useClickOutside } from '../../../../hooks/useClickOutsideV2';

export default function SectionListItem({ children, groupId, active }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown, defaultGroupId } = useSelector(
    (state) => state.manage
  );

  const dropdownRef = useRef();
  const isCurrentDropdown =
    isDropdownOpen &&
    dropdown.activeGroupId === groupId &&
    dropdown.type === manageDropdownType.GROUP;

  function handleSetActive() {
    if (token) dispatch(setGroupListActive(token, groupId));
  }

  const baseStyle =
    'viewport flex justify-between py-1 text-lg font-bold px-4 rounded-2xl relative ';
  const statusStyle = active
    ? 'bg-main-01 text-white'
    : 'bg-white text-main-01';

  const buttonStyle = 'active:bg-main-01-active active:text-white';

  function handleGroupDropdown() {
    if (defaultGroupId !== groupId)
      dispatch(
        toggleDropdown({
          type: manageDropdownType.GROUP,
          activeGroupId: groupId,
        })
      );
  }
  function handleCloseDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.classList.contains('dropdown-toggle')) {
      dispatch(closeDropdown());
    }
  }

  useClickOutside(dropdownRef, handleCloseDropdown);

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
  const handleMenuRightClick = (e) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      handleGroupDropdown(e);
    }
  };

  return (
    <li
      className={`${baseStyle} ${statusStyle} ${buttonStyle}`}
      onContextMenu={handleMenuRightClick}
    >
      <button
        className="w-full pr-3 text-left"
        type="button"
        onClick={(e) => handleSetActive(e)}
      >
        {children}
      </button>

      <button
        className="flex items-center "
        type="button"
        onClick={() => handleGroupDropdown()}
      >
        {groupId !== defaultGroupId && (
          <BiDotsHorizontalRounded className="dropdown-toggle h-[30px] w-[30px]" />
        )}
      </button>

      {isCurrentDropdown && (
        <div
          className="absolute top-10 right-3 z-10 text-base font-normal"
          ref={dropdownRef}
        >
          <DropdownMenu>
            <DropdownMenuItem>
              <button
                type="button"
                className="h-full w-full p-4 text-left"
                onClick={() => handleOpenRenameGroupModal()}
              >
                群組更名
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem warning>
              <button
                type="button"
                className="h-full w-full p-4 text-left"
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
