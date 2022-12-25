import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from './Modal';
import Button from '../Button/Button';

function NoSupportModal() {
  const router = useRouter();
  return (
    <Modal>
      <div className="flex flex-col items-center text-center font-bold text-main-01">
        <Image
          src="/warn.svg"
          width={180}
          height={221}
          alt="warning"
          className="mb-9"
        />
        <p className="mb-2 text-h4">非常抱歉</p>
        <p className="mb-12 text-fs-6">
          名片製作功能
          <br className="laptop:hidden" />
          尚未開放手機板
        </p>
        <div className="flex gap-12 text-fs-6">
          <Button
            className="w-36 bg-main-01"
            onClick={() => {
              router.push('/');
            }}
          >
            返回首頁
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default NoSupportModal;
