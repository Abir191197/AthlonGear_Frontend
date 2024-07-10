import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WithStyles from "../Type/WithStyles";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const CarouselComponent: React.FC = () => {
  return (
    <div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="w-full h-full"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable>
        <WithStyles
          description="UP TO"
          headline="LIMITED TIME "
          per="40"
          description2="% OFF"
          image="https://res.cloudinary.com/dymnilfcs/image/upload/v1720625900/jsbp8jcnpkl5rglzilun.png"
        />
        <WithStyles
          description="UP TO"
          headline="Limited Time"
          per="50"
          description2="% OFF"
          image="https://res.cloudinary.com/dymnilfcs/image/upload/v1720629751/qwqtxdq2ady657m037j8.jpg"
        />
        <WithStyles
          description="UP TO"
          headline="Limited Time"
          per="35"
          description2="% OFF"
          image="https://res.cloudinary.com/dymnilfcs/image/upload/v1720630256/tnguch3wu5nm5yltxuxy.jpg"
        />
        <WithStyles
          description="UP TO"
          headline="Limited Time"
          per="30"
          description2="% OFF"
          image="https://res.cloudinary.com/dymnilfcs/image/upload/v1720630253/usuee5i4jmc7rkubzqov.jpg"
        />
        <WithStyles
          description="UP TO"
          headline="Limited Time"
          per="30"
          description2="% OFF"
          image="https://res.cloudinary.com/dymnilfcs/image/upload/v1720630252/fiwnkdddid5mdtjqepkh.jpg"
        />
      </Carousel>
    </div>
    
  );
  
};

export default CarouselComponent;
