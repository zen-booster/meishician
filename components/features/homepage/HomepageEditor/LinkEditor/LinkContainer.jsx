export default function LinkContainer({ children }) {
  return (
    <div className="mb-3 flex border border-black">
      <div className="w-[20px] min-w-[20px] shrink-0 bg-main-02" />
      <div className="shrink-1 w-full">{children}</div>
    </div>
  );
}
