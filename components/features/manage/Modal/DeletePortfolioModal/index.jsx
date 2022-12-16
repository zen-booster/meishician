import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import Button from '../../../../common/Button/Button';
import cardWaring from '../../../../../public/card-warning.svg';

import {
  closeAll,
  deletePortfolio,
} from '../../../../../store/actions/manageActions';

function DeletePortfolioModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { modal } = useSelector((state) => state.manage);
  const { activeCompanyName, activeJobTitle, activeName, activeCardId } = modal;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { messageBody } = data;
    dispatch(deletePortfolio(token, activeCardId, messageBody));
  };

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>刪除個人名片</ModalHeader>
      <div className="flex flex-col items-center  justify-center">
        <Image
          src={cardWaring}
          alt="delete bookmark"
          width="100%"
          height="100%"
          className="mb-5"
        />

        <p className="mb-7 text-center text-xl text-main-01">
          確定要刪除這張名片？
          <br />
          刪除後將會發送訊息給追蹤此名片的用戶
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            type="text"
            className="w-[350px] p-1"
            rows={3}
            style={{ resize: 'none' }}
            defaultValue={`${activeCompanyName} ${activeJobTitle} - ${activeName} 已刪除名片，珍重再見`}
            {...register('messageBody', { required: true })}
          />
          <div className="mt-10 flex gap-5">
            <Button
              variant="outlined"
              className="w-full bg-white"
              onClick={() => handleCloseOpen()}
            >
              取消
            </Button>
            <Button color="danger" className="w-full" submit>
              刪除
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default DeletePortfolioModal;
