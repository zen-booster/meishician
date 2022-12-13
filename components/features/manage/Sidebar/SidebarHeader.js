export default function SidebarHeader({ children, className, active }) {
  const baseStyle = 'mb-3 block py-2 px-3 text-2xl font-bold text- rounded-xl';
  const statusStyle = active
    ? 'bg-main-01 text-white'
    : 'bg-white text-main-01';
  return (
    <h2 className={`${baseStyle} ${statusStyle} ${className} `}>{children}</h2>
  );
}
