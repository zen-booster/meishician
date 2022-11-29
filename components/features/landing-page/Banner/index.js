import Image from 'next/image';

function Banner() {
  return (
    <div className="-mt-16 flex h-screen flex-col items-center justify-center bg-main-02 text-main-01">
      <Image src="/logo-dark.png" width={280} height={111} alt="logo" />
      <h2 className="mb-6 text-5xl">
        電子名片
        <br />
        商務方案
      </h2>
      <p className="mb-12">電子名片製作、交換、管理一手搞定</p>
      <button
        type="button"
        className="w-52 rounded-xl  bg-main-01 py-5 text-center text-white"
      >
        立即試試
      </button>
    </div>
  );
}

export default Banner;
