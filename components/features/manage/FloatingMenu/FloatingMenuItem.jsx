export default function FloatingMenuItem({ children, warning }) {
  return (
    <li
      className={`border-x border-t border-black bg-white p-3 hover:bg-gray-300 ${
        warning ? 'text-red-500' : 'text-black'
      } last:border-b`}
    >
      {children}
    </li>
  );
}
