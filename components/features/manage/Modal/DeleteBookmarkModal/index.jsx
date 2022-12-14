import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import Button from '../../../../common/Button/Button';
import cardWaring from '../../../../../public/card-warning.svg';

import {
  closeAll,
  deleteBookmark,
  setInitData,
} from '../../../../../store/actions/manageActions';

function DeleteBookmarkModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { modal } = useSelector((state) => state.manage);
  const { activeCardId, activeGroupId } = modal;
  function handleDelete() {
    dispatch(deleteBookmark(token, activeCardId));
    dispatch(setInitData(token, activeGroupId));
  }
  function handleCloseOpen() {
    dispatch(closeAll());
  }

  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>刪除收藏名片</ModalHeader>
      <div className="flex flex-col items-center  justify-center">
        <Image
          src={cardWaring}
          alt="delete bookmark"
          width="100%"
          height="100%"
          className="mb-5"
        />
        <p className="text-xl text-gray-700"> 確定刪除嗎？</p>
      </div>

      <div className="mt-10 flex gap-5">
        <Button
          color="danger"
          className="w-full"
          onClick={() => handleDelete()}
        >
          刪除
        </Button>
        <Button
          variant="outlined"
          className="w-full bg-white"
          onClick={() => handleCloseOpen()}
        >
          取消
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteBookmarkModal;
