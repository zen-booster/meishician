export default function NewLinkWrapper({ children }) {
  return (
    <div className="mb-3 flex border border-black">
      <div className="flex w-[30px]	items-center justify-center bg-main-02" />
      <div className="w-full">{children}</div>
    </div>
  );
}
