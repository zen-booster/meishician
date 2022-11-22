function Overlay({ show }) {
  return (
    <div
      className="fixed inset-0 h-full w-full bg-black opacity-40"
      onClick={() => show(false)}
    />
  );
}

export default Overlay;
