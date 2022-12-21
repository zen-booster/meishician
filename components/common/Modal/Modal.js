function Modal({ show, children }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => {
          if (show) show(false);
        }}
      />
      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto w-modal-width rounded-xl bg-main-02 px-6 py-8 shadow-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
