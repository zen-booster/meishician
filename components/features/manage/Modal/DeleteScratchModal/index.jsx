import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import Button from '../../../../common/Button/Button';
import cardWaring from '../../../../../public/card-warning.svg';

import {
  closeAll,
  deleteScratch,
} from '../../../../../store/actions/manageActions';

function DeleteScratchModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { modal } = useSelector((state) => state.manage);
  const { activeCardId } = modal;

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  function handleDeleteScratch() {
    dispatch(deleteScratch(token, activeCardId));
  }

  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>刪除名片存檔</ModalHeader>
      <div className="flex flex-col items-center  justify-center">
        <Image
          src={cardWaring}
          alt="delete bookmark"
          width="100%"
          height="100%"
          className="mb-5"
        />

        <p className="mb-7 text-center text-xl text-main-01">
          確定要刪除未發佈名片存檔？
        </p>

        <div className=" flex w-full gap-5">
          <Button
            variant="outlined"
            className="w-full bg-white"
            onClick={() => handleCloseOpen()}
          >
            取消
          </Button>
          <Button
            color="danger"
            className="w-full"
            onClick={() => {
              handleDeleteScratch();
            }}
          >
            刪除
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteScratchModal;
