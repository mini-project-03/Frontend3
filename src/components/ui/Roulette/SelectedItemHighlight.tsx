import { motion } from 'framer-motion';

interface SelectedItemHighlightProps {
  src: string;
}

const SelectedItemHighlight = ({ src }: SelectedItemHighlightProps) => {
  const name = src.replace(/^\/|(\.png|\.jpg)$/g, '');

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [1, 0.9, 1],
      }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="absolute inset-0 flex items-center justify-center z-30"
    >
      <div className="bg-white bg-opacity-80 px-4 py-2 rounded-full border-2 border-primary text-primary font-bold shadow-lg text-lg flex items-center gap-2">
        <span>오늘은</span>
        <span>{name}</span>
      </div>
    </motion.div>
  );
};

export default SelectedItemHighlight;
