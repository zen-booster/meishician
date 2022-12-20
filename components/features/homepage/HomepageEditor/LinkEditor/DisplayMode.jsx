import Image from 'next/image';
import editIcon from '../../../../../public/icons/edit.svg';

export default function DisplayMode({
  title,
  subTitle,
  link,
  iconSrc,
  onOpenEditorClick,
}) {
  function truncateString(str, num) {
    if (str.length > num) {
      return `${str.slice(0, num)}...`;
    }
    return str;
  }
  return (
    <div className="flex px-4 py-2">
      <div className="mr-3 flex items-center justify-center">
        <div
          style={{
            backgroundImage: `url(${iconSrc})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: 40,
            height: 40,
          }}
        />
      </div>
      <div className="shrink-1 mr-auto">
        <h3 className="break-all font-bold text-main-01">{title || ''}</h3>
        <h4 className=" break-all text-main-02">{subTitle && subTitle}</h4>
        <p className="flex flex-wrap break-all text-gray-500">
          {truncateString(link, 25)}
        </p>
      </div>
      <div className="flex w-5 shrink-0 justify-center">
        <button type="button" onClick={onOpenEditorClick}>
          <Image src={editIcon} alt="edit link" />
        </button>
      </div>
    </div>
  );
}
