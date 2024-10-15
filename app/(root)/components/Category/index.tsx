"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from "next/image";
import {useCategories} from "@/hooks/useCategories";

const CategoryComponent: React.FC = () => {
  const {data, isLoading, error} = useCategories()

  console.log(data)
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={7}
      loop={true}
      navigation={true} 
      modules={[Navigation]}
      className="my-10"
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index} className="py-5 !w-fit">
          <button className="flex gap-2 items-center bg-white rounded-xl w-fit py-1 px-2 shadow-airbnbSoft text-sm md:text-base hover:scale-105 hover:shadow-antiMetal transition-all duration-500">
            <Image src={item.logoUrl} alt={"logo of " + item.name} width={15} height={15} />
            <h2 className="text-gray-500 whitespace-nowrap w-fit">{item.name}</h2>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoryComponent;
