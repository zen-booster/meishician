import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Modal from '../../../../common/Modal/Modal';
import Button from '../../../../common/Button/Button';
import { publishCanvas } from '../../../../../store/actions';
import { fabricContext } from '../../Canvas';
import setSaveData from '../../service/setSaveData';
import { TOGGLE_LOADER } from '../../../../../constants/constants';

function WarnModal({ setShowWarn }) {
  const canvasRef = useContext(fabricContext);
  const router = useRouter();
  const { cardId } = router.query;
  const { history } = useSelector((state) => state);
  const dispatch = useDispatch();

  const publish = async () => {
    dispatch({ type: TOGGLE_LOADER });
    const saveData = await setSaveData(canvasRef, history, dispatch);
    dispatch(publishCanvas(cardId, saveData, router));
  };

  return (
    <Modal show={setShowWarn}>
      <div className="flex flex-col items-center font-bold text-main-01">
        <Image
          src="/warn.svg"
          width={180}
          height={221}
          alt="warning"
          className="mb-9"
        />
        <p className="mb-16 text-h4">準備發布名片了嗎？</p>
        <div className="flex gap-12 text-fs-6">
          <Button
            variant="outlined"
            className="w-36 bg-white"
            onClick={() => setShowWarn(false)}
          >
            取消
          </Button>
          <Button className="w-36 bg-main-01" onClick={publish}>
            確定發布
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WarnModal;
