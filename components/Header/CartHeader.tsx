import { IoCartOutline } from "react-icons/io5";

const CartHeader: React.FC = () => {
  return (
    <>
      <div>
        <button className="flex items-center text-red-500 gap-2 hover:scale-105 transition-all text-sm">
          <IoCartOutline className=" text-xl" /> 5
        </button>
      </div>
    </> 
  );
};

export default CartHeader;
