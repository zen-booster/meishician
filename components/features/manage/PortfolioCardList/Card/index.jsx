import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

import CardHeader from './CardHeader';
import CardJobInfo from './CardJobInfo';
import DropdownMenu from '../../DropdownMenu';
import DropdownMenuItem from '../../DropdownMenu/DropdownMenuItem';
import { useClickOutside } from '../../../../../hooks/useClickOutsideV2';
// import ItemTypes from '../../ItemTypes';
import {
  toggleDropdown,
  openModal,
  openShowCardModal,
  closeDropdown,
} from '../../../../../store/actions/manageActions';

import {
  manageModalType,
  manageDropdownType,
} from '../../../../../store/reducers/manageReducer';

export default function Card({ cardData }) {
  // const { token } = useSelector((state) => state.loginStatus);
  const dropdownRef = useRef();
  const { token } = useSelector((state) => state.loginStatus);
  const { isDropdownOpen, dropdown } = useSelector((state) => state.manage);
  const dispatch = useDispatch();
  function handleCloseDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.classList.contains('dropdown-toggle')) {
      dispatch(closeDropdown());
    }
  }
  useClickOutside(dropdownRef, handleCloseDropdown);
  const {
    cardId,
    companyName,
    createdAt,
    jobTitle,
    name,
    phoneNumber,
    isPublished,
  } = cardData;

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
  function handleOpenShowCardModal() {
    dispatch(openShowCardModal(token, cardId));
  }

  function handleOpenShowQrCodeModal() {
    dispatch(
      openModal({
        type: manageModalType.SHOW_QRCODE,
        activeCardId: cardId,
      })
    );
  }

  function handleOpenDeletePortfolioModal() {
    dispatch(
      openModal({
        type: manageModalType.DELETE_PORTFOLIO,
        activeCardId: cardId,
        activeCompanyName: companyName,
        activeJobTitle: jobTitle,
        activeName: name,
      })
    );
  }

  function handleOpenDeleteScratchModal() {
    dispatch(
      openModal({
        type: manageModalType.DELETE_SCRATCH,
        activeCardId: cardId,
      })
    );
  }

  const handleMenuRightClick = (e) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      handleDropdown(e);
    }
  };
  const createDate = format(parseISO(createdAt), 'yyyy/MM/dd HH:mm:ss');

  return (
    <div
      className="relative basis-full p-3 xl:basis-1/3"
      onContextMenu={(e) => {
        handleMenuRightClick(e);
      }}
    >
      <div className="flex h-full flex-col rounded-xl border  border-gray-300 bg-white shadow-01 ">
        <div className="px-5 pt-5">
          <CardHeader
            name={name}
            onMenuActiveClick={(e) => handleDropdown(e)}
          />

          {isPublished ? (
            <Link href={`/homepage/${cardId}`}>
              <CardJobInfo
                jobTitle={jobTitle}
                companyName={companyName}
                phoneNumber={phoneNumber}
              />
              <p className="mb-3 text-slate-300">???????????? {createDate}</p>
            </Link>
          ) : (
            <div>
              <CardJobInfo
                jobTitle={jobTitle}
                companyName={companyName}
                phoneNumber={phoneNumber}
              />
              <p className="mb-3 text-slate-300">???????????? {createDate}</p>
            </div>
          )}
        </div>

        {isPublished ? (
          <button
            type="button"
            onClick={(e) => handleOpenShowQrCodeModal(e)}
            className="flex grow items-center justify-center rounded-b-xl bg-[#268785] p-3 text-white"
          >
            ??????QR Code
          </button>
        ) : (
          <div className="flex grow items-center justify-center rounded-b-xl bg-gray-400 p-3 text-white">
            ???????????????
          </div>
        )}
      </div>

      {isCurrentDropdown &&
        (isPublished ? (
          <div className="absolute top-16 right-0 z-10" ref={dropdownRef}>
            <DropdownMenu>
              <DropdownMenuItem>
                <button
                  className="h-full w-full p-4 text-left"
                  type="button"
                  onClick={(e) => handleOpenShowCardModal(e)}
                >
                  ????????????
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  className="block h-full w-full p-4 text-left"
                  href={`/canvas-editor/${cardId}`}
                >
                  ????????????
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem warning>
                <button
                  className="h-full w-full p-4 text-left"
                  type="button"
                  onClick={(e) => handleOpenDeletePortfolioModal(e)}
                >
                  ????????????
                </button>
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        ) : (
          <div className="absolute top-16 right-0 z-10">
            <DropdownMenu>
              <DropdownMenuItem>
                <Link
                  className="block h-full w-full p-4 text-left"
                  href={`/canvas-editor/${cardId}`}
                >
                  ?????????????????????
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem warning>
                <button
                  type="button"
                  className="h-full w-full p-4 text-left"
                  onClick={(e) => handleOpenDeleteScratchModal(e)}
                >
                  ????????????
                </button>
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        ))}
    </div>
  );
}
