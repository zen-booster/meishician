import { format, parseISO } from 'date-fns';
// import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRef } from 'react';

import { useDrag, DragPreviewImage } from 'react-dnd';
import Image from 'next/image';
import { boxImage } from './dnd-preview-img';

import SectionTag from '../../SectionTag';
import CardHeader from './CardHeader';
import CardJobInfo from './CardJobInfo';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuItem from '../../DropdownMenu/DropdownMenuItem';
import ItemTypes from '../../ItemTypes';
import {
  toggleDropdown,
  openModal,
  toggleCardPin,
  setInitData,
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
    // canDrag: () => !isLinkEditorActive,
    collect: (monitor) => ({
      isCardDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
  });

  const opacity = isCardDragging ? 0.2 : 1;
  cardDrag(ref);

  return (
    <>
      <DragPreviewImage connect={preview} src={boxImage} />
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

  // function handleCloseAll() {
  //   if (isDropdownOpen === true) dispatch(closeAll());
  // }

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
    <div className="relative basis-full p-3 xl:basis-1/3">
      <CardDnd id={cardId}>
        <div className="flex h-full flex-col rounded-t-xl rounded-b-2xl border  border-gray-300 bg-white shadow-01 ">
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
                <SectionTag>{ele}</SectionTag>
              ))}
            </div>

            <div className="flex basis-1/4 items-center justify-end">
              <Image
                src={avatar}
                width={56}
                height={56}
                style={{ objectFit: 'contain' }}
                className="h-[56px] w-[56px] rounded-full object-contain"
                alt="card avatar"
              />
            </div>
          </div>
        </div>
      </CardDnd>

      {isCurrentDropdown && (
        <div className="absolute top-16 right-0 z-10">
          <DropdownMenu>
            <DropdownMenuItem>
              <button
                type="button"
                onClick={(e) => handleOpenEditBookmarkNotesModal(e)}
              >
                編輯名片
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem warning>
              <button
                type="button"
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
