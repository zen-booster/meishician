export default function JobInfoTable({ children }) {
  return (
    <div className="py-10 px-5">
      <table className="laptop:text-xl">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
