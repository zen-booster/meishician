import Link from 'next/link';
import Button from '../../../common/Button/Button';

function Guide() {
  return (
    <div className="flex flex-col items-center bg-gray-400 py-44">
      <h3 className="mb-20 text-center text-2xl font-bold">
        MEISHIcian
        <br />
        幫你的名片施加魔法
      </h3>
      <Link href="/canvas-editor">
        <Button>立即使用</Button>
      </Link>
    </div>
  );
}

export default Guide;
