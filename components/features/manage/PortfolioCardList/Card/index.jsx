import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import CardHeader from './CardHeader';
import CardJobInfo from './CardJobInfo';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuItem from '../../DropdownMenu/DropdownMenuItem';
// import ItemTypes from '../../ItemTypes';
import {
  toggleDropdown,
  openModal,
  // toggleCardPin,
  // setInitData,
} from '../../../../../store/actions/manageActions';

import {
  manageModalType,
  manageDropdownType,
} from '../../../../../store/reducers/manageReducer';

export default function Card({ cardData }) {
  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown } = useSelector((state) => state.manage);
  const dispatch = useDispatch();

  const {
    cardId,
    companyName = '公司未公開',
    createdAt,
    jobTitle = '職稱未公開',
    name = '姓名未公開',
    phoneNumber,
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
  function handleOpenShowCardModal() {
    dispatch(
      openModal({
        type: manageModalType.SHOW_CARD,
        activeCardId: cardId,
      })
    );
  }

  function handleOpenShowQrCodeModal() {
    dispatch(
      openModal({
        type: manageModalType.SHOW_QRCODE,
        activeCardId: cardId,
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

  const createDate = format(parseISO(createdAt), 'yyyy/MM/dd HH:mm:ss');

  return (
    <div className="relative basis-full p-3 xl:basis-1/3">
      <div className="flex h-full flex-col rounded-xl border  border-gray-300 bg-white shadow-01 ">
        <div className="px-5 pt-5">
          <CardHeader
            name={name}
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

        <button
          type="button"
          className="flex grow items-center justify-center rounded-b-xl bg-[#268785] p-3 text-white"
        >
          展開名片
        </button>
      </div>

      {isCurrentDropdown && (
        <div className="absolute top-16 right-0 z-10">
          <DropdownMenu>
            <DropdownMenuItem>
              <button type="button" onClick={(e) => handleOpenShowCardModal(e)}>
                展示名片
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button
                type="button"
                onClick={(e) => handleOpenDeleteBookMarkModal(e)}
              >
                修改名片
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
