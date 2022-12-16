function Modal({ onCloseModal, children }) {
  return (
    <div className="fixed inset-0 z-30 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => {
          onCloseModal();
        }}
      />
      <div className="flex min-h-screen items-center">
        <div className="relative mx-auto w-modal-width rounded-xl bg-main-02 px-2 py-8 shadow-lg laptop:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
