import Image from 'next/image';

function Avatar({ src }) {
  return (
    <Image
      src={src || '/avatar.svg'}
      width={32}
      height={32}
      alt="avatar"
      className="h-9 w-9 cursor-pointer"
    />
  );
}

export default Avatar;
