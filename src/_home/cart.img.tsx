'use client';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';

export default function LargeDisplay() {
  const images = [
    '/images/slider-image-3.jpeg',
    '/images/slider-image-2.jpeg',
    '/images/slider-image-1.jpeg',
    '/images/blog-img-1.jpeg',
    '/images/blog-img-2.jpeg',
    '/images/grocery-banner-2.jpeg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    accessibility: false,
  };

  return (
    <div className="w-full h-auto md:h-[50vh] max-h-[800px] flex flex-col md:flex-row-reverse justify-center items-stretch gap-2 md:gap-4 p-2 md:p-4 mx-auto">
      
      <div className="w-full md:w-3/4 h-full md:h-full">
        <Slider {...settings} className="h-full rounded-lg overflow-hidden shadow-lg">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full" tabIndex={-1}>
              <img
                src={img}
                alt={`Slider ${idx}`}
                className="w-full  object-cover"
              />
            </div>
          ))} 
        </Slider>
      </div>

      <div className="w-full md:w-1/4 h-auto md:h-full flex flex-row md:flex-col justify-between gap-2 md:gap-0">
        {images.slice(0, 2).map((img, idx) => (
          <div
            key={idx}
            className="w-1/2  md:w-full  h-[150px] md:h-[48%] overflow-hidden rounded-lg shadow-lg"
            tabIndex={-1}
          >
            <img
              src={img}
              alt={`Side ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}