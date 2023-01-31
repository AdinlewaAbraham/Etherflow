import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Portfolio = (p) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <AnimatePresence>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 2 }}
        >
          <p>Hello! I am a component that is being animated.</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Portfolio;
