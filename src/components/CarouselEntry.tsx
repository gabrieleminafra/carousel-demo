import React, { FC } from "react";
import { CarouselEntryInterface } from "../Carousel";

const CarouselEntry: FC<CarouselEntryInterface> = ({
  milestone,
  images,
  year,
  isActive,
}) => {
  return (
    <div className="carousel__entry">
      {images.map((image) => (
        <div
          key={image}
          className={`carousel__entry__section carousel__entry--image ${
            isActive && "active"
          }`}>
          <img
            style={{ width: "10rem" }}
            src={`/${image}.png`}
            alt={milestone}
          />
        </div>
      ))}

      <section
        className={`carousel__entry__section carousel__entry--milestone ${
          isActive && "active"
        }`}>
        <p dangerouslySetInnerHTML={{ __html: milestone }}></p>
      </section>
      <section
        className={`carousel__entry__section carousel__entry--year ${
          isActive && "active"
        }`}>
        {year}
      </section>
    </div>
  );
};

export default CarouselEntry;
