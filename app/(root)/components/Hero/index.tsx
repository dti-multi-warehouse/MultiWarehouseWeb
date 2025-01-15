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
    tagline: "SALE UP TO 50%!"
  },
  {
    image: hero3,
    tagline: "SHOP SMART, SHOP FAST"
  },
  {
    image: hero2,
    tagline: "FASTER DELIVERY"
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
          <div className={`h-[350px] md:h-[400px] flex justify-center bg-gray-300 hover:bg-red-300 bg-bgBenefit bg-blend-screen bg-repeat bg-contain text-black uppercase cursor-pointer rounded-xl border-2 border-gray-300 relative`}>
            
            <div className="overflow-hidden absolute w-full h-full z-10 rounded-xl bottom-0">
              <Image 
                src={item.image}
                alt="item image"
                className={`w-full h-full top-0 rounded-xl hover:scale-110 hover:animate-in duration-300 transition-all  object-bottom ${index === 2 ? "object-contain" : "object-cover"}`}
              />
            </div>
            <p className={`p-5 z-20 w-full h-fit font-black text-gray-700 text-2xl lg:text-3xl xl:text-4xl text-center`}>{item.tagline}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
