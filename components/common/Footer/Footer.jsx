import Image from 'next/image';

function Footer() {
  return (
    <div className="flex flex-col items-center bg-main-01 pt-16 pb-8 font-bold text-white">
      <Image
        src="/logo-dark.svg"
        className="mb-12 w-[15rem]"
        width={161}
        height={64}
        alt="logo"
      />
      <ul className="mb-8 flex gap-36 text-fs-6">
        <li>名片牆</li>
        <li>打造名片</li>
        <li>管理名片</li>
      </ul>
      <p>Zen Booster © 2022</p>
    </div>
  );
}

export default Footer;
