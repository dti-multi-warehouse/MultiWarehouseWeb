import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Buttons from "@/components/Buttons";

interface AddAddressProps {
  onClose: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ onClose }) => {
  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pt-5 text-center">Tambah Alamat</DialogTitle>
          </DialogHeader>
          <hr className="border-dashed border-gray-800" />
          <Formik
            initialValues={{
              name: "",
              phoneNumber: "",
              label: "",
              street: "",
              city: "",
              province: "",
              isPrimary: "",
            }}
            validationSchema={Yup.object().shape({
              
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className="p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <label className="font-semibold">Nama</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nama Penerima"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                </div>
                <div>
                  <label className="font-semibold">Nomor Telepon</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="08xxxxxxxxxx"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold">Label Alamat</label>
                <Field
                  type="text"
                  name="label"
                  placeholder="Contoh: Rumah/Kantor/dll"
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
              </div>
              <div>
                <label className="font-semibold">Alamat</label>
                <Field
                  type="text"
                  name="street"
                  placeholder="Ketik Alamat Lengkap"
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between gap-5">
                <div>
                  <label className="font-semibold">Kota</label>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Ketik Kota"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                </div>
                <div>
                  <label className="font-semibold">Provinsi</label>
                  <Field
                    type="text"
                    name="province"
                    placeholder="Ketik Provinsi"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                </div>
              </div>
              <div className="w-full h-[200px] bg-gray-300 rounded-xl">
                <Field
                  type="text"
                  name="province"
                  placeholder="Masukkan titik..."
                  className="w-[150px] p-1 border-2 rounded-lg border-gray-300"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="" className="flex items-center gap-1 font-semibold text-sm text-gray-400">
                  <Field type="checkbox" name="agreeToTerms" />
                  Jadikan Alamat Utama
                </label>
                <div className="flex items-center gap-5">
                  <Buttons type="submit">Simpan</Buttons>
                  <Buttons
                    className="bg-gray-300 text-gray-600"
                    onClick={onClose}
                  >
                    Batal
                  </Buttons>
                </div>
              </div>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddAddress;
