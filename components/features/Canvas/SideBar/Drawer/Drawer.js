import { MdKeyboardArrowLeft } from 'react-icons/md';
import { motion } from 'framer-motion';
import TextTool from './Tool/TextTool';
import ImageTool from './Tool/ImageTool';
import ShapeTool from './Tool/ShapeTool';
import TemplateTool from './Tool/TemplateTool';

function Drawer({ buttonName, toggleDrawer }) {
  const containerVariants = {
    init: {
      width: '0px',
    },
    show: {
      width: '208px',
      transition: {
        when: 'beforeChildren',
        mass: 0.1,
      },
    },
  };

  const contentVariants = {
    init: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="relative z-20 flex h-full w-52 flex-col items-center bg-gray-03 px-3 py-4"
      variants={containerVariants}
      initial="init"
      animate="show"
    >
      <button
        onClick={toggleDrawer}
        name="close"
        type="button"
        className="absolute top-1/2 left-full -translate-y-1/2 rounded-r-xl bg-gray-03 py-5"
      >
        <MdKeyboardArrowLeft className="pointer-events-none text-h5 text-white" />
      </button>

      {buttonName === 'Template' && (
        <motion.div
          className="w-full"
          variants={contentVariants}
          exit={{ opacity: 0 }}
        >
          <TemplateTool />
        </motion.div>
      )}

      {buttonName === 'Text' && (
        <motion.div
          className="w-full"
          variants={contentVariants}
          exit={{ opacity: 0 }}
        >
          <TextTool />
        </motion.div>
      )}
      {buttonName === 'Material' && (
        <motion.div
          className="w-full"
          variants={contentVariants}
          exit={{ opacity: 0 }}
        >
          <ShapeTool />
        </motion.div>
      )}
      {buttonName === 'Image' && (
        <motion.div
          className="w-full"
          variants={contentVariants}
          exit={{ opacity: 0 }}
        >
          <ImageTool />
        </motion.div>
      )}
    </motion.div>
  );
}

export default Drawer;
