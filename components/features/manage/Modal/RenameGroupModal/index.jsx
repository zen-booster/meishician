import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import ModalInput from '../ModalInput';

import Button from '../../../../common/Button/Button';

import {
  closeAll,
  renameGroup,
} from '../../../../../store/actions/manageActions';

function RenameGroupModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { activeGroupId } = useSelector((state) => state.manage.modal);

  const {
    handleSubmit,
    control,
    // watch,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { groupName } = data;
    dispatch(renameGroup(token, activeGroupId, groupName));
  };

  function handleCloseOpen() {
    dispatch(closeAll());
  }

  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>群組更名</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="groupName">
          <h3 className="mb-1 text-lg font-bold">群組名稱</h3>

          <Controller
            control={control}
            rules={{ required: true }}
            name="groupName"
            id="groupName"
            render={({ field }) => {
              const { ref, ...restFiled } = field;
              return <ModalInput {...restFiled} />;
            }}
          />
        </label>
        <div className="mt-10 flex gap-5">
          <Button className="w-full" submit>
            確定
          </Button>
          <Button
            variant="outlined"
            className="w-full bg-white"
            onClick={() => handleCloseOpen()}
          >
            取消
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default RenameGroupModal;
