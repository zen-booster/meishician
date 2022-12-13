import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import Button from '../../../../common/Button/Button';
import cardWaring from '../../../../../public/card-warning.svg';

import {
  closeAll,
  deleteGroup,
  setInitData,
} from '../../../../../store/actions/manageActions';

function DeleteGroupModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { modal } = useSelector((state) => state.manage);
  const { activeGroupId } = modal;

  async function handleDelete() {
    // eslint-disable-next-line no-unused-vars
    const deleteRes = await dispatch(deleteGroup(token, activeGroupId));
    // eslint-disable-next-line no-unused-vars
    const initRes = await dispatch(setInitData(token));
  }

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>刪除群組</ModalHeader>
      <div className="flex flex-col items-center  justify-center">
        <Image
          src={cardWaring}
          alt="delete bookmark"
          width="100%"
          height="100%"
          className="mb-5"
        />
        <p className="text-center text-xl text-gray-700">
          確定刪除群組嗎？
          <br />
          刪除後，原群組內收藏名片將會轉移到預設群組
        </p>
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

export default DeleteGroupModal;
