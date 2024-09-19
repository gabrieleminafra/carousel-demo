import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import CarouselEntry from "./components/CarouselEntry.tsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import useCarousel from "./hooks/useCarousel.ts";
import useElementSize from "./hooks/useElementSize.ts";
import useWindowCenterPoint from "./hooks/useWindowCenterPoint.ts";

import CAROUSEL_DATA from "./assets/mock_data.json";
import "./Carousel.scss";

export interface CarouselEntryInterface {
  isActive: boolean;
  milestone: string;
  images: string[];
  year: number;
}

const Carousel: FC = () => {
  const { nextItem, prevItem, currentIndex } = useCarousel(CAROUSEL_DATA);
  const centerPoint = useWindowCenterPoint();

  const RAIL = useRef(null);
  const VIEWPORT_WIDTH = centerPoint * 2;
  const RAIL_WIDTH = useElementSize(RAIL);
  const ENTRY_WIDTH = RAIL_WIDTH / CAROUSEL_DATA.length;

  const [railPosition, setRailPosition] = useState(0);

  useEffect(() => {
    const calculatedRailPosition =
      currentIndex * -ENTRY_WIDTH + (centerPoint - ENTRY_WIDTH / 2);

    const entriesOnScreen = VIEWPORT_WIDTH / ENTRY_WIDTH;

    if (calculatedRailPosition > 0) {
      setRailPosition(0);
      return;
    }

    if (Math.abs(calculatedRailPosition) > RAIL_WIDTH - VIEWPORT_WIDTH) {
      setRailPosition((RAIL_WIDTH - entriesOnScreen * ENTRY_WIDTH) * -1);

      return;
    }

    setRailPosition(
      currentIndex * -ENTRY_WIDTH + (centerPoint - ENTRY_WIDTH / 2)
    );
  }, [currentIndex, centerPoint]);

  return (
    <div className="carousel">
      <div
        ref={RAIL}
        className="carousel__rail"
        style={{
          left: railPosition,
        }}>
        {CAROUSEL_DATA.map((entry, index) => (
          <CarouselEntry
            {...entry}
            key={entry.year}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      <div className="carousel__controls">
        <button className="carousel__controls__button" onClick={prevItem}>
          <FaArrowLeft color="#0D419B" />
        </button>
        <button className="carousel__controls__button" onClick={nextItem}>
          <FaArrowRight color="#0D419B" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
