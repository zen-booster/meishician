export default function SectionTag({ children }) {
  return (
    <li className="inline-block rounded bg-slate-300 py-1 px-2 hover:bg-slate-700 hover:text-white">
      <button type="button">{`#${children}`}</button>
    </li>
  );
}
