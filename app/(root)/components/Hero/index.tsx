"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import hero1 from "@/public/1.png";
import hero2 from "@/public/2.png";
import hero3 from "@/public/3.png";

import { Pagination, Navigation } from 'swiper/modules';
import Image from "next/image";

const HeroContent = [
  {
    image: hero1,
    tagline: "Multiple warehouses for faster delivery."
  },
  {
    image: hero2,
    tagline: "Shop Seasoning, Tea & More."
  },
  {
    image: hero3,
    tagline: "From Warehouse to Your Kitchen with Fast Shipping."
  },
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
    autoplay={true}
    navigation={true}
    modules={[Pagination, Navigation]}
    className="mySwiper !overflow-visible"
    >
      {HeroContent.map((item, index) => (
        <SwiperSlide key={index}>
          <div className={`h-[400px] flex bg-gray-300 hover:bg-red-300 bg-bgBenefit bg-blend-screen bg-repeat bg-contain text-black uppercase cursor-pointer rounded-xl border-2 border-gray-300 relative ${ index === 1 ? " md:items-start" : "lg:items-center " }`}>
            
            <div className="overflow-hidden absolute w-full h-full z-10 rounded-xl">
              <Image 
                src={item.image}
                alt="item image"
                className="w-full h-full object-cover object-right md:object-center top-0 rounded-xl hover:scale-110 hover:animate-in duration-300 transition-all"
              />
            </div>
            <p className={`p-5 z-20 w-full h-fit font-black text-gray-700 text-xl md:text-xl lg:text-3xl max-w-[370px] ${index === 1 ? "mt-9 md:mt-16" : ""}`}>{item.tagline}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
