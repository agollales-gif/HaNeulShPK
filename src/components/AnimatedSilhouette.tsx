import { motion } from 'motion/react';

export default function AnimatedSilhouette() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]">
      <motion.svg 
        viewBox="0 0 400 400" 
        className="w-[120%] h-[120%] max-w-[1000px] text-navy"
        initial="hidden"
        animate="visible"
      >
        {/* Abstract Magpie / Cloud Morphing Path */}
        <motion.path
          d="M 100 200 C 100 100 200 50 300 150 C 400 250 350 350 250 350 C 150 350 100 300 100 200 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1,
              d: [
                "M 100 200 C 100 100 200 50 300 150 C 400 250 350 350 250 350 C 150 350 100 300 100 200 Z",
                "M 150 200 C 150 150 250 100 350 200 C 450 300 300 400 200 350 C 100 300 150 250 150 200 Z",
                "M 100 200 C 100 100 200 50 300 150 C 400 250 350 350 250 350 C 150 350 100 300 100 200 Z"
              ],
              transition: { 
                pathLength: { duration: 4, ease: "easeInOut" },
                d: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              }
            }
          }}
        />
        <motion.path
          d="M 150 250 C 100 250 50 200 100 150 C 150 100 250 150 300 200 C 350 250 250 300 150 250 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 0.5,
              transition: { duration: 5, ease: "easeInOut", delay: 1 }
            }
          }}
        />
      </motion.svg>
    </div>
  );
}
