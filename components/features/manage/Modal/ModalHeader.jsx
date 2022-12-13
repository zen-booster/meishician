function ModalHeader({ children, className }) {
  return (
    <div
      className={`mb-5 text-center text-h4 font-bold text-main-01 ${className}`}
    >
      {children}
    </div>
  );
}

export default ModalHeader;
