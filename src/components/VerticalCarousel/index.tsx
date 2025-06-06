/* eslint-disable @next/next/no-img-element */
import React from "react";
import "./verticalCarousel.scss";

type VerticalCarouselProps = {
  pictures: Item["pictures"];
  selected: string;
  onSelectImage: (id: string) => void;
};

const VerticalCarousel = (props: VerticalCarouselProps) => {
  const { selected, onSelectImage, pictures } = props;
  return (
    <div className='vertical-carousel'>
      {pictures.map((picture: Picture) => (
        <div
          key={picture.id}
          tabIndex={0}
          className={`vertical-carousel__item ${selected === picture.url ? "selected" : ""}`}
          onClick={() => onSelectImage(picture.url)}
        >
          <img src={picture.url} alt={picture.id} />
        </div>
      ))}
    </div>
  );
};

export default VerticalCarousel;
