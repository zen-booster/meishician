import Button from '../../../common/Button/Button';

function Banner() {
  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center bg-gray-400">
      <h2 className="text-white">電子名片商務方案</h2>
      <p>電子名片製作、交換、管理一手搞定</p>
      <Button>瞭解更多</Button>
    </div>
  );
}

export default Banner;
