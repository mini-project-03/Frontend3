import { AnimationControls, motion } from 'framer-motion';

interface RouletteItemsProps {
  controls: AnimationControls;
  allItems: string[];
  selectedGlobalIndex: number | null;
  selectedIndex: number | null;
  itemHeight: number;
}

const RouletteItems = ({
  controls,
  allItems,
  selectedGlobalIndex,
  itemHeight,
}: RouletteItemsProps) => {
  return (
    <motion.div animate={controls} initial={{ y: 0 }} className="flex flex-col">
      {allItems.map((src, index) => {
        const isWinner = index === selectedGlobalIndex;
        const altText = src.replace(/^\/|\.png$/g, '');

        return (
          <div
            key={index}
            className={`relative w-full ${isWinner ? 'z-20' : ''}`}
            style={{ height: itemHeight }}
          >
            <motion.img
              src={src}
              alt={altText}
              className={`w-full h-full object-cover ${
                isWinner ? 'border-4 border-primary rounded-lg shadow-xl' : ''
              }`}
              animate={
                isWinner
                  ? {
                      scale: [1, 1.12, 1],
                      opacity: [1, 0.8, 1],
                      borderColor: ['#EC4899', 'rgba(236, 72, 153, 0.2)', '#EC4899'],
                      boxShadow: [
                        '0 0 0px 0px #EC4899',
                        '0 0 30px 10px #EC4899',
                        '0 0 0px 0px #EC4899',
                      ],
                    }
                  : {}
              }
              transition={isWinner ? { repeat: Infinity, duration: 1 } : {}}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default RouletteItems;
