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
  openShowCardModal,
  // toggleCardPin,
  // setInitData,
} from '../../../../../store/actions/manageActions';

import {
  manageModalType,
  manageDropdownType,
} from '../../../../../store/reducers/manageReducer';

export default function Card({ cardData }) {
  // const { token } = useSelector((state) => state.loginStatus);

  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown } = useSelector((state) => state.manage);
  const dispatch = useDispatch();

  const { cardId, companyName, createdAt, jobTitle, name, phoneNumber } =
    cardData;

  const isCurrentDropdown =
    isDropdownOpen &&
    dropdown.activeCardId === cardId &&
    dropdown.type === manageDropdownType.PORTFOLIO;

  function handleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleDropdown({
        type: manageDropdownType.PORTFOLIO,
        activeCardId: cardId,
      })
    );
  }
  async function handleOpenShowCardModal() {
    dispatch(openShowCardModal(token, cardId));

    dispatch(
      openModal({
        type: manageModalType.SHOW_CARD,
        activeCardId: cardId,
      })
    );
  }

  function handleOpenShowQrCodeModal() {
    console.log(cardId);
    dispatch(
      openModal({
        type: manageModalType.SHOW_QRCODE,
        activeCardId: cardId,
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
          onClick={(e) => handleOpenShowQrCodeModal(e)}
          className="flex grow items-center justify-center rounded-b-xl bg-[#268785] p-3 text-white"
        >
          打開QR Code
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
              <Link href={`/canvas-editor/${cardId}`}>修改名片</Link>
            </DropdownMenuItem>
            <DropdownMenuItem warning>
              <button
                type="button"
                onClick={(e) => handleOpenDeletePortfolioModal(e)}
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
