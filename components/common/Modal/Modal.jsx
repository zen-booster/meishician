import { motion } from 'framer-motion';

function Modal({ show, children }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => {
          if (show) show(false);
        }}
      />
      <div className="flex min-h-screen items-center px-4 ">
        <motion.div
          className="relative mx-auto w-modal-width rounded-xl bg-main-02 px-6 py-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default Modal;
