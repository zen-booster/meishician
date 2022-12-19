export default function SidebarHeader({
  children,
  className,
  active,
  button,
  onClick,
}) {
  const baseStyle =
    'mb-3 block py-2 px-3 text-lg  laptop:text-2xl font-bold rounded-xl';
  const statusStyle = active
    ? 'bg-main-01 text-white'
    : 'bg-white text-main-01';
  const buttonStyle = button
    ? 'hover:text-white hover:bg-main-01 active:bg-main-01-active'
    : '';

  return (
    <h2 className={`${baseStyle} ${statusStyle} ${buttonStyle} ${className} `}>
      {button ? (
        <button
          type="button"
          className="w-full text-left"
          onClick={() => onClick()}
        >
          {children}
        </button>
      ) : (
        children
      )}
    </h2>
  );
}
