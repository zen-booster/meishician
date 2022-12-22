import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDrag, DragPreviewImage } from 'react-dnd';
import Image from 'next/image';
import Link from 'next/link';

import { format, parseISO } from 'date-fns';

import SectionTag from '../../SectionTag';
import CardHeader from './CardHeader';
import CardJobInfo from './CardJobInfo';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuItem from '../../DropdownMenu/DropdownMenuItem';
import ItemTypes from '../../ItemTypes';
import { useClickOutside } from '../../../../../hooks/useClickOutsideV2';

import { boxImage as cardDnDImage } from './dnd-preview-img';

import {
  toggleDropdown,
  openModal,
  toggleCardPin,
  setInitData,
  closeDropdown,
} from '../../../../../store/actions/manageActions';

import {
  manageModalType,
  manageDropdownType,
} from '../../../../../store/reducers/manageReducer';

function CardDnd({ children, id }) {
  const ref = useRef(null);
  const [{ isCardDragging }, cardDrag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: { id, cardId: id },
    collect: (monitor) => ({
      isCardDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
  });

  const opacity = isCardDragging ? 0.2 : 1;
  cardDrag(ref);

  return (
    <>
      <DragPreviewImage connect={preview} src={cardDnDImage} />
      <div
        className="h-full"
        ref={ref}
        style={{ transform: `scale(${opacity}})`, opacity }}
      >
        {children}
      </div>
    </>
  );
}

export default function Card({ cardData }) {
  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown } = useSelector((state) => state.manage);
  const dispatch = useDispatch();
  const dropdownRef = useRef();
  const {
    avatar = '/avatar.svg',
    cardId,
    companyName = '公司未公開',
    createdAt,
    isPinned,
    jobTitle = '職稱未公開',
    name = '姓名未公開',
    tags = [],
    phoneNumber,
    note,
    followerGroupId: groupId,
  } = cardData;
  const isCurrentDropdown =
    isDropdownOpen &&
    dropdown.activeCardId === cardId &&
    dropdown.type === manageDropdownType.BOOKMARK;

  function handleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleDropdown({
        type: manageDropdownType.BOOKMARK,
        activeCardId: cardId,
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

  const handleMenuRightClick = (e) => {
    if (e.type === 'contextmenu') {
      handleDropdown(e);
    }
  };

  function handleOpenEditBookmarkNotesModal() {
    dispatch(
      openModal({
        type: manageModalType.EDIT_BOOKMARK,
        activeCardId: cardId,
        activeGroupId: groupId,
        activeBookmarkNote: {
          tags,
          note,
        },
      })
    );
  }

  function handleOpenDeleteBookMarkModal() {
    dispatch(
      openModal({
        type: manageModalType.DELETE_BOOKMARK,
        activeCardId: cardId,
        activeGroupId: groupId,
      })
    );
  }

  function handleToggleCardPin(e) {
    e.preventDefault();
    e.stopPropagation();
    const pin = !isPinned;
    dispatch(toggleCardPin(token, cardId, pin));
    dispatch(setInitData(token, groupId));
  }

  const createDate = format(parseISO(createdAt), 'yyyy/MM/dd HH:mm:ss');

  return (
    <div
      className="relative basis-full p-3 xl:basis-1/3"
      onContextMenu={handleMenuRightClick}
    >
      <CardDnd id={cardId}>
        <div
          className="flex h-full flex-col rounded-t-xl rounded-b-2xl border  border-gray-300 bg-white shadow-01 "
          id={cardId}
          data-tooltip-content="hello world"
        >
          <div className="px-5 pt-5">
            <CardHeader
              name={name}
              isPinned={isPinned}
              onToggleCardPin={(e) => handleToggleCardPin(e)}
              onMenuActiveClick={(e) => handleDropdown(e)}
            />

            <Link href={`/homepage/${cardId}`}>
              <CardJobInfo
                jobTitle={jobTitle}
                companyName={companyName}
                phoneNumber={phoneNumber}
              />

              <p className="mb-3 text-slate-300">加入時間 {createDate}</p>
            </Link>
          </div>

          <div className="flex grow items-center justify-center rounded-b-xl bg-[#d5eadc] p-3">
            <div className="flex basis-3/4 flex-wrap gap-2">
              {tags.map((ele) => (
                <SectionTag key={ele}>{ele}</SectionTag>
              ))}
            </div>

            <div className="flex basis-1/4 items-center justify-end">
              <Image
                src={avatar}
                width={56}
                height={56}
                style={{ objectFit: 'cover' }}
                className="h-[56px] w-[56px] rounded-full object-contain"
                alt="card avatar"
              />
            </div>
          </div>
        </div>
      </CardDnd>

      {isCurrentDropdown && (
        <div className="absolute top-16 right-0 z-10 " ref={dropdownRef}>
          <DropdownMenu>
            <DropdownMenuItem>
              <button
                className="h-full w-full p-4 text-left"
                type="button"
                onClick={(e) => handleOpenEditBookmarkNotesModal(e)}
              >
                編輯名片註記
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem warning>
              <button
                type="button"
                className="h-full w-full p-4 text-left"
                onClick={(e) => handleOpenDeleteBookMarkModal(e)}
              >
                刪除名片
              </button>
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
