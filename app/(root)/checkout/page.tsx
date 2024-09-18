import { cart, profileInf } from "@/data/data";
import { RiEdit2Fill } from "react-icons/ri";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Buttons from "@/components/Buttons";
import Image from "next/image";

const Checkout: React.FC = () => {
  return (
    <>
      <div className="w-full p-10 flex flex-col gap-5">
        <h1 className="font-bold text-xl">Checkout Pesanan</h1>
        <div className="flex gap-10">
          <div className="w-[60%] flex flex-col gap-5">
            <div className="flex flex-col gap-5 py-3">
              <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
              <h3 className="font-semibold">Detail Pembeli</h3>
              <hr className="border-dashed border-gray-700" />
              {profileInf?.address
                ?.filter((address) => address.isMainAddress)
                .map((address, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="font-semibold">{address.label}</p>
                      <button className="bg-red-200 text-red-600 rounded-full p-2">
                        <RiEdit2Fill />
                      </button>
                    </div>
                    <div className="flex gap-3 font-medium">
                      <p>{address.name}</p> - <p>{address.phone}</p>
                    </div>
                    <div>
                      <p>{address.address}</p>
                      <p>{address.country}</p>
                    </div>
                    <p className="font-bold text-sm text-gray-600">
                      Alamat Utama
                    </p>
                  </div>
                ))}
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-lg "></div>

            <div className="flex flex-col gap-5 py-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Pengiriman</h3>
                <p>Invoice: PM-23456-sfafda</p>
              </div>
              <hr className="border-dashed border-gray-700" />
              <p>Jumat, 23 Agustus 2024</p>
              <p>Pembayaran maksimal dapat dilakukan 1 jam setelah checkout.</p>
            </div>

            <div className="h-2 w-full bg-gray-200 rounded-lg "></div>

            <div className="flex flex-col gap-10">
              <h3 className="font-semibold">Stok Barang</h3>
              <div className="flex flex-col gap-5">
                {cart.map((item, index) => {
                  return (
                    <div key={index} className="flex gap-10 w-full">
                      <Image
                        src={`/${item.image}`}
                        alt={item.name}
                        width={150}
                        height={150}
                      />
                      <div className="flex flex-col gap-3 w-full">
                        <h2 className="font-semibold text-gray-600">
                          {item.name}
                        </h2>
                        <div className="flex items-center justify-between gap-20">
                          <p className="font-semibold text-lg">
                            Rp {item.price}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                          <p className="font-semibold">
                            Jumlah beli {item.quantity}
                          </p>
                          <p className="font-semibold text-lg text-red-600">
                            Rp {item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-[40%] flex flex-col gap-10 mx-10 p-10 bg-gray-100 h-fit rounded-xl shadow-boxedSoft">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Pesanan</h2>
              <hr className="border-dashed border-gray-900" />
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-semibold text-lg">Rp 32.000</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Ongkos Kirim</p>
                <p className="font-semibold text-lg">Rp 5.000</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Metode Pembayaran</h2>
              <hr className="border-dashed border-gray-900" />
              <RadioGroup defaultValue="BCA" className="font-semibold text-xl flex flex-col gap-5">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BCA" id="r1" />
                  <Label htmlFor="r1">BCA</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="OVO" id="r2" />
                  <Label htmlFor="r2">OVO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mandiri" id="r3" />
                  <Label htmlFor="r3">Mandiri</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bank Transfer" id="r3" />
                  <Label htmlFor="r3">Bank Transfer</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Total Pembayaran</h2>
              <hr className="border-dashed border-gray-900" />
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p className="font-semibold text-lg">Rp 38.000</p>
              </div>
            </div>
            <Buttons className="w-fit self-center font-semibold !px-10 !py-2">
              Checkout Now
            </Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
