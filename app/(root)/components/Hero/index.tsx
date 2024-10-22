"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import hero1 from "@/public/1.jpg";
import hero2 from "@/public/2.jpg";
import hero3 from "@/public/3.jpg";

import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

const HeroContent = [
  hero1, hero2, hero3
];

const Hero: React.FC = () => {
  return (
    <Swiper
    breakpoints={{
      '@0.00': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '@1.00': {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    }}
    loop={true}
    pagination={{
      clickable: true,
    }}
    navigation={true}
    modules={[Pagination, Navigation]}
        className="mySwiper"
    >
      {HeroContent.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="h-[250px] flex items-end bg-gray-950 text-white cursor-pointer rounded-xl relative">
            <div className="overflow-hidden absolute w-full h-full z-0">
              <Image 
                src={item}
                alt="item image"
                className=" w-full h-full object-cover object-center top-0 rounded-xl"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
