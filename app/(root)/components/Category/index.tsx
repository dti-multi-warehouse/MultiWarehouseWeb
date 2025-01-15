"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useCategories } from "@/hooks/useCategories";
import CategorySkeleton from "./CategorySkeleton";
import { useRouter } from "next/navigation";

const CategoryComponent: React.FC = () => {
  const { data, isLoading, error } = useCategories();
  const router = useRouter();

  if (isLoading) {
    return (
      <div>
        <CategorySkeleton />
      </div>
    );
  }

  if (error || !data?.length) {
    return (
      <div className="text-gray-500 rounded-xl font-semibold py-1 px-2 shadow-airbnbSoft">
        There are no categories to show.
      </div>
    );
  }

  return (
    <Swiper
      spaceBetween={30}
      breakpoints={{
        1280:{
          slidesPerView: 7,
        },
        1024: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 4, 
        },
        640: {
          slidesPerView: 3, 
        },
        0: {
          slidesPerView: 2, 
        },
      }}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper my-10 !overflow-visible"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index} className="py-5 !w-fit">
          <button
            className="flex gap-2 items-center bg-white rounded-xl w-fit py-1 px-2 shadow-airbnbSoft text-sm md:text-base hover:scale-105 hover:shadow-antiMetal transition-all duration-500"
            onClick={() => router.push(`/product?category=${item.name}`)}
          >
            <Image
              src={item.logoUrl}
              alt={"logo of " + item.name}
              width={15}
              height={15}
            />
            <h2 className="text-gray-500 whitespace-nowrap w-fit">{item.name}</h2>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoryComponent;
