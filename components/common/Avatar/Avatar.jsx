import Image from 'next/image';

function Avatar() {
  return (
    <Image
      src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
      width={36}
      height={36}
      alt="avatar"
      className="h-9 w-9 cursor-pointer"
    />
  );
}

export default Avatar;
