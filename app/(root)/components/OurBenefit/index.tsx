import { FaShippingFast } from "react-icons/fa";
import { MdOutlineGppGood } from "react-icons/md";
import { BiSolidTimer } from "react-icons/bi";
import playstore from "@/public/assets/playstore.png";
import appstore from "@/public/assets/apple.png";
import Image from "next/image";

const benefits = [
  {
    icon: <BiSolidTimer />,
    title: "No Wasting Time",
    description: "Fast and Reliable Shipping from Multiple Warehouses.",
  },
  {
    icon: <MdOutlineGppGood />,
    title: "High Quality",
    description: "Freshly Packed and Quality Guaranteed.",
  },
  {
    icon: <FaShippingFast />,
    title: "Secure Payment & Shipping",
    description:
      "We handle the shipping logistics so you can focus on cooking, not shopping.",
  },
];

const downloadStore = [
  {
    image: playstore,
    name: "PlayStore",
  },
  {
    image: appstore,
    name: "AppStore",
  },
];

const OurBenefit: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 mt-5 md:mt-10 bg-red-100 p-5 md:py-10 rounded-xl items-center bg-bgBenefit bg-repeat bg-contain bg-blend-screen border-2 border-gray-200">
      {/* <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold  md:mb-5">
        Benefit Order with Us
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`p-5 bg-gray-100 rounded-xl md:p-10 flex flex-col gap-1 items-center text-center border-4 border-white shadow-boxedSoft shadow-gray-300 hover:shadow-gray-500 duration-300 group  ${
              index === 2
                ? "md:col-span-2 md:row-start-2 lg:row-start-1 lg:col-start-3"
                : ""
            }`}
          >
            <p className="text-5xl text-gray-400 benefit-icon group-hover:animate-bounce group-hover:text-red-600 group-hover:duration-1000">
              {benefit.icon}
            </p>
            <h3 className="font-bold text-xl lg:text-2xl text-red-600">{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8 items-center w-full col-span-4 text-center pt-5 md:pt-10">
        <div className="flex flex-col items-center gap-5 w-full">
            <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
                Order with your phone now
            </h3>
            <p className="md:text-lg font-medium lg:max-w-[50%] text-gray-600">
            We are now available to be downloaded in playstore and appstore. You
            can checkout easily and track your order from our app.
            </p>
        </div>
        <div className="flex  gap-4">
          {downloadStore.map((store, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-2 bg-black text-white py-3 px-10 rounded-xl border-4 border-white shadow-airbnbSoft shadow-gray-400 cursor-pointer hover:scale-105 duration-300">
              <Image
                src={store.image}
                alt="Download Store"
                width={70}
                height={70}
                className="object-center object-contain"
              />
              <div className="flex flex-col items-start">
                <p>Get it on</p>
                <h3 className="text-xl font-semibold">{store.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBenefit;
