import Image from 'next/image';
import { useRouter } from 'next/router';
import Modal from '../../../common/Modal/Modal';
import Button from '../../../common/Button/Button';

function LoadFailedModal() {
  const router = useRouter();
  return (
    <Modal>
      <div className="flex flex-col items-center font-bold text-main-01">
        <Image
          src="/warn.svg"
          width={180}
          height={221}
          alt="warning"
          className="mb-9"
        />
        <p className="mb-16 text-h4">畫布初始化失敗</p>
        <div className="flex gap-12 text-fs-6">
          <Button
            className="w-36 bg-main-01"
            onClick={() => {
              router.back();
            }}
          >
            確定
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LoadFailedModal;
