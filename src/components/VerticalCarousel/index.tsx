/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./verticalCarousel.scss";

type VerticalCarouselProps = {
  pictures: DetailItem["pictures"];
  selected: string;
  onSelectImage: (id: string) => void;
};

const VerticalCarousel = (props: VerticalCarouselProps) => {
  const { selected, onSelectImage, pictures } = props;
  return (
    <div className='vertical-carousel'>
      {pictures?.map((picture) => (
        <div
          key={picture}
          tabIndex={0}
          className={`vertical-carousel__item ${selected === picture ? "selected" : ""}`}
          onClick={() => onSelectImage(picture)}
        >
          <img src={picture} alt={picture} />
        </div>
      ))}
    </div>
  );
};

export default VerticalCarousel;
