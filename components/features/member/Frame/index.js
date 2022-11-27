import Image from 'next/image';

function Frame() {
  return (
    <div className="flex h-full w-full flex-col items-center bg-main-02 laptop:min-w-99">
      <h2 className="mt-2.5 mb-4 text-rwd-h2 text-main-01 laptop:mt-10 laptop:mb-7 laptop:text-h2">
        電子名片
        <br />
        商務方案
      </h2>
      <p className="mb-4 text-rwd-body text-main-01 laptop:text-body">
        電子名片製作、交換、管理一手搞定
      </p>
      <Image
        className="laptop:hidden"
        src="/meishician-image.png"
        alt="meishician-image"
        width={184}
        height={157}
      />
      <Image
        className="hidden laptop:mt-auto laptop:block"
        src="/meishician-image-laptop.png"
        alt="meishician-image"
        width={384}
        height={327}
      />
    </div>
  );
}

export default Frame;
