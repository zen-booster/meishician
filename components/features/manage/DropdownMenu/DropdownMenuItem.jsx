export default function DropdownMenuItem({ children, warning }) {
  return (
    <li
      className={`border border-x border-t bg-white hover:bg-gray-100 ${
        warning ? 'text-red-500' : 'text-black'
      } last:border-b`}
    >
      {children}
    </li>
  );
}
