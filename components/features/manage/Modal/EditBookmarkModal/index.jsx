import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import Modal from '../Modal';
import ModalHeader from '../ModalHeader';
import ModalInput from '../ModalInput';

import Button from '../../../../common/Button/Button';

import {
  closeAll,
  editBookmarkNotes,
  setInitData,
} from '../../../../../store/actions/manageActions';

function EditBookmarkModal() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.loginStatus);
  const { modal, groupList } = useSelector((state) => state.manage);
  const { activeBookmarkNote, activeCardId, activeGroupId } = modal;
  const { tags, note } = activeBookmarkNote ?? {};

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let { tags } = data;
    const { groupId, note } = data;
    if (tags) tags = tags.replace(/\s/g, '').split(',');
    if (!tags) tags = [];

    const newNotes = {
      tags,
      note,
      followerGroupId: groupId,
    };
    await dispatch(editBookmarkNotes(token, activeCardId, newNotes));
    await dispatch(setInitData(token, groupId));
  };

  function handleCloseOpen() {
    dispatch(closeAll());
  }
  return (
    <Modal onCloseModal={() => handleCloseOpen()}>
      <ModalHeader>編輯名片註記</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <label htmlFor="tags">
          <h3 className="mb-1">
            標籤
            <span className="font-normal text-gray-500">{`(請以","分隔)`}</span>
          </h3>

          <Controller
            control={control}
            name="tags"
            id="tags"
            defaultValue={tags && tags.join(', ')}
            render={({ field }) => {
              const { ref, ...restFiled } = field;
              return <ModalInput {...restFiled} />;
            }}
          />
        </label>

        <label htmlFor="groupId">
          <h3 className="mb-1 ">群組</h3>
          <select
            name="groupId"
            id="groupId"
            className="h-[38px] w-full rounded-lg py-1 px-2 text-lg"
            {...register('groupId')}
          >
            {groupList.map((group) => (
              <option
                key={group._id}
                value={group._id}
                selected={group._id === activeGroupId}
              >
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="note">
          <h3 className="mb-1 ">註記</h3>

          <Controller
            control={control}
            name="note"
            id="note"
            defaultValue={note}
            render={({ field }) => {
              const { ref, ...restFiled } = field;
              return <ModalInput {...restFiled} />;
            }}
          />
        </label>

        <div className="mt-10 flex gap-5">
          <Button
            variant="outlined"
            className="w-full bg-white"
            onClick={() => handleCloseOpen()}
          >
            取消
          </Button>
          <Button className="w-full" submit>
            確定
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditBookmarkModal;
