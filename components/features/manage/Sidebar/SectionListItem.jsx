import { useDispatch, useSelector } from 'react-redux';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import DropdownMenu from '../DropdownMenu';
import DropdownMenuItem from '../DropdownMenu/DropdownMenuItem';
import {
  openModal,
  toggleDropdown,
  setGroupListActive,
} from '../../../../store/actions/manageActions';
import {
  manageDropdownType,
  manageModalType,
} from '../../../../store/reducers/manageReducer';

export default function SectionListItem({ children, groupId, active }) {
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
    'flex justify-between py-1 text text-base laptop:text-lg font-bold px-4 rounded-3xl relative ';
  const statusStyle = active
    ? 'bg-main-01 text-white'
    : 'bg-white text-main-01';

  const buttonStyle =
    'hover:text-white hover:bg-main-01 active:bg-main-01-active';

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
    <button
      type="button"
      onClick={() => handleSetActive()}
      className={`${baseStyle} ${statusStyle} ${buttonStyle}  w-full items-center pr-3 text-left`}
    >
      {children}

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
    </button>
  );
}
