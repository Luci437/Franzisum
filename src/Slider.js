import React, { useState, useEffect } from "react";
import { sliderImage, sliderImage2 } from "./Images/Assests";
import Merch from "./LatestMerch";

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [activeImage, setActiveImage] = useState(
    [sliderImage][0][currentImage]
  );

  useEffect(() => {
    const setImageSlider = () => {
      const totalImage = sliderImage.length;
      if (currentImage > totalImage - 1) {
        setCurrentImage(0);
      } else if (currentImage < 0) {
        setCurrentImage(totalImage - 1);
      }
      setActiveImage([sliderImage][0][currentImage]);
    };
    setImageSlider();
  }, [currentImage]);

  const nextSlide = () => {
    setCurrentImage(currentImage + 1);
  };

  const prevSlide = () => {
    setCurrentImage(currentImage - 1);
  };
  return (
    <div className="MerchAndSliderBox">
      <div className="mainSliderBox">
        <div className="imagePart">
          <img src={activeImage} className="sliderImage" alt="mainSlider" />

          <div className="sliderController">
            <i className="fas fa-chevron-left" onClick={prevSlide}></i>
            <p>
              <strong>{currentImage + 1}</strong> of
              <strong>{sliderImage.length}</strong>
            </p>
            <i className="fas fa-chevron-right" onClick={nextSlide}></i>
          </div>
        </div>
        <div className="dataPart">
          <p className="categoryName">Featured & Recommended</p>
          <p className="shortTitleName">The Cycle</p>

          <div className="fourImageBox">
            {sliderImage2.map((slides, i) => (
              <div className="imgBox" key={i}>
                <img
                  src={slides.name}
                  alt="SliderImage"
                  className="fourImages"
                />
              </div>
            ))}
          </div>

          <div className="availableOptions">
            <p>
              <i className="fab fa-youtube"></i> Youtube
            </p>
            <p>
              <i className="fas fa-atlas"></i> Article
            </p>
          </div>
        </div>
      </div>
      <Merch />
    </div>
  );
};

export default Slider;
