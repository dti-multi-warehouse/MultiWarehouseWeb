"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BiDrink } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiShop, GiInnerSelf, GiMeat } from "react-icons/gi";
import Image from "next/image";
import {useCategories} from "@/hooks/useCategories";

const category = [
  { name: "Minuman", icon: <BiDrink /> },
  { name: "Makanan", icon: <IoFastFood /> },
  { name: "Kebutuhan Dapur", icon: <FaKitchenSet /> },
  { name: "Pet Foods", icon: <MdOutlinePets /> },
  { name: "Kebutuhan Rumah", icon: <GiShop /> },
  { name: "Personal Care", icon: <GiInnerSelf /> },
  { name: "Produk Segar", icon: <GiMeat /> },
  { name: "Peralatan Mandi", icon: <GiInnerSelf /> },
  { name: "Kesehatan", icon: <GiMeat /> },
];

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
            {/*<span className="text-red-500">{item.icon}</span>*/}
            <Image src={item.logoUrl} alt={"logo of " + item.name} width={15} height={15} />
            <h2 className="text-gray-500 whitespace-nowrap w-fit">{item.name}</h2>
          </button>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoryComponent;
