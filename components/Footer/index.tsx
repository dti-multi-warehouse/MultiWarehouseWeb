import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiCustomerService2Line } from "react-icons/ri";

const paymentMethod = [
  { name: "COD", image: "cod.png" },
  { name: "BCA", image: "bca.png" },
  { name: "Mandiri", image: "mandiri.png" },
  { name: "Ovo", image: "ovo.png" },
  { name: "BRI", image: "bri.png" },
];

const menuFooter = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "About", link: "/about" },
];

const socMed = [
  { icon: <FaFacebook />, link: "http://facebook.com" },
  { icon: <FaInstagram />, link: "http://instagram.com" },
  { icon: <FaTwitter />, link: "http://twitter.com" },
];

const contacts = [
  { name: "contact@alphamarch.com", icon: <TfiEmail /> },
  { name: "+6281234567890", icon: <RiCustomerService2Line /> },
];

const Footer: React.FC = () => {
  return (
    <>
    <div className="flex flex-col px-10 pt-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 ">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-red-600 text-2xl">AlphaMarch</h1>
          <p className="lg:mr-10 text-gray-600 font-medium">Shop Smart, Shop Fast, Shop Alpha March! Bringing the Store to Your Door.</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Quick Menu</h3>
          <div className="flex flex-col gap-3">
            {menuFooter.map((item, index) => (
              <Link href={item.link} key={index} className=" font-medium text-gray-600  hover:scale-105 transition-all duration-500">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-lg">Payment Method</h3>
          <div className="flex gap-1">
            {paymentMethod.map((item, index) => (
              <Image
                src={`/assets/${item.image}`}
                alt={item.name}
                width={50}
                height={30}
                key={index}
                className="object-contain rounded-full p-1 border-2 border-red-100"
              />
            ))}
          </div>
          <h3 className="font-bold text-lg">Follow us</h3>
          <div className="flex items-center gap-3">
            {socMed.map((item, index) => (
              <Link key={index} href={item.link} className="text-[30px] text-red-600 hover:scale-105 transition-all duration-500">{item.icon}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
            <h3 className="font-bold text-lg">Our Contact</h3>
            <div className="flex flex-col gap-3">
                {contacts.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="text-gray-500 font-bold text-lg">{item.icon}</span> 
                        <p className="text-gray-500 font-medium">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
      <hr className="mt-10 border-dashed border-gray-600" />
      <p className="text-center text-sm font-semibold text-gray-600 my-5">&copy; Alpha March, 2024. All Right Reserved.</p>
    </div>
    </>
  );
};

export default Footer;
