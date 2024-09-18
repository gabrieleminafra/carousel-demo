import { useState, useEffect } from "react";

const useCarousel = (items) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return {
    currentItem: items[currentIndex],
    currentIndex,
    nextItem,
    prevItem,
  };
};

export default useCarousel;
