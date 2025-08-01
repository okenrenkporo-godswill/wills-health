"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const sliderImages = [
  { src: "/herosec.jpg", text: "Compassion meets technology." },
  { src: "/laboratory.jpg", text: "Caring made smarter." },
  { src: "/nurse.jpg", text: "Health starts with insight." },
];

const ImageSlider = () => {
  return (
    <div className="w-full mb-6">
      <div className="relative w-full h-[260px] md:h-[360px] rounded-xl overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {sliderImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[260px] md:h-[360px]">
                <Image
                  src={slide.src}
                  alt={slide.text}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm md:text-lg p-2">
                  {slide.text}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom pagination container below the image */}
      <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
    </div>
  );
};

export default ImageSlider;
