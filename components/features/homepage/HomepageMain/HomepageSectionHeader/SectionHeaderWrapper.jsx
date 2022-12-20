export default function SectionHeaderWrapper({ children }) {
  return (
    <div className="mx-auto flex  items-center bg-main-02 px-4 py-2 laptop:rounded-xl">
      {children}
    </div>
  );
}
