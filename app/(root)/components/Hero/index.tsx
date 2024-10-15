"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

const HeroContent = [
  {
    title: "Groceries Delivery",
    description: "Groceries delivered fast and easy. Everything you need, right at your door.",
  },
  {
    title: "Fresh Produce",
    description: "Fresh fruits and veggies, from our warehouse to your kitchen.",
  },
  {
    title: "Quality Meat",
    description: "All your essentials in one place. Shop now and stay stocked up.",
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
    navigation={true}
    modules={[Pagination, Navigation]}
        className="mySwiper"
    >
      {HeroContent.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="h-[250px] flex items-end p-5 bg-gray-950 text-white cursor-pointer rounded-xl">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl uppercase font-bold">{item.title}</h2>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
