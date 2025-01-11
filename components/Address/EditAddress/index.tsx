"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Buttons from "@/components/Buttons";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  useGetUserAddressById,
  useUpdateUserAddress,
} from "@/hooks/useAddress";
import { userAddress } from "@/types/datatypes";
import React from "react";

interface EditAddressProps {
  onClose: () => void;
  addressId: number;
}

const EditAddress: React.FC<EditAddressProps> = ({ onClose, addressId }) => {
  const [coordinates, setCoordinates] = useState({
    latitude: -6.2,
    longitude: 106.816666,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const mapRef = useRef<any>(null);

  const { address: addressData, isLoading: addressLoading } =
    useGetUserAddressById(addressId);
  const { mutate: updateAddress } = useUpdateUserAddress();

  const [initialValues, setInitialValues] = useState({
    name: "",
    phoneNumber: "",
    label: "",
    street: "",
    city: "",
    province: "",
    isPrimary: false,
  });

  useEffect(() => {
    if (addressData) {
      setInitialValues({
        name: addressData.name || "",
        phoneNumber: addressData.phoneNumber || "",
        label: addressData.label || "",
        street: addressData.address?.street || "",
        city: addressData.address?.city || "",
        province: addressData.address?.province || "",
        isPrimary: addressData.primary || false,
      });
      setCoordinates({
        latitude: addressData.address?.latitude || -6.2,
        longitude: addressData.address?.longitude || 106.816666,
      });
    }
  }, [addressData]);

  const fetchGeolocation = async (fullAddress: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          fullAddress
        )}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
      );
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setCoordinates({ latitude: lat, longitude: lng });
        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 13);
        }
      } else {
        alert(
          "Address not found. Please click on the map to set the location."
        );
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      alert("Error fetching geolocation data.");
    } finally {
      setIsLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
      );
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const { components } = data.results[0];
        const street = components.road || components.neighbourhood || "";
        const city = components.city || components.town || "";
        const province = components.state || components.region || "";
        return { street, city, province };
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation data:", error);
      alert("Error fetching reverse geolocation data.");
    } finally {
      setIsLoading(false);
    }
    return { street: "", city: "", province: "" };
  };

  const MapClickHandler = ({ setFieldValue }: any) => {
    useMapEvents({
      click: async (e: any) => {
        const { lat, lng } = e.latlng;
        setCoordinates({ latitude: lat, longitude: lng });
        const address = await reverseGeocode(lat, lng);
        setFieldValue("street", address.street);
        setFieldValue("city", address.city);
        setFieldValue("province", address.province);
      },
    });
    return null;
  };

  if (addressLoading) return <p>Loading address data...</p>;

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="pt-5 text-center">Edit Alamat</DialogTitle>
          </DialogHeader>
          <hr className="border-dashed border-gray-800" />
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Nama is required"),
              phoneNumber: Yup.string().required("Nomor telepon is required"),
              label: Yup.string().required("Label is required"),
              street: Yup.string().required("Alamat is required"),
              city: Yup.string().required("Kota is required"),
              province: Yup.string().required("Provinsi is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              const dataToSubmit: userAddress = {
                ...values,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              };
              updateAddress(
                { addressId, data: dataToSubmit },
                {
                  onSuccess: () => {
                    alert("Address updated successfully!");
                    onClose();
                  },
                  onError: (err) => {
                    console.error("Error updating address:", err);
                    alert("Failed to update address.");
                  },
                  onSettled: () => {
                    setSubmitting(false);
                  },
                }
              );
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
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
                <div>
                  <label className="font-semibold">Alamat</label>
                  <Field
                    type="text"
                    name="street"
                    placeholder="Ketik Alamat Lengkap"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                    onBlur={async () => {
                      const fullAddress = `${values.street}, ${values.city}, ${values.province}`;
                      if (values.street && values.city && values.province) {
                        await fetchGeolocation(fullAddress);
                      }
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  * click anywhere to <strong> load map </strong>after input the
                  address
                </p>
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center justify-center mb-3">
                  <Buttons
                  onClick={() => {
                    setGettingLocation(true);
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const { latitude, longitude } = position.coords;
                        setCoordinates({ latitude, longitude });
                        const address = await reverseGeocode(latitude, longitude);
                        setFieldValue("street", address.street);
                        setFieldValue("city", address.city);
                        setFieldValue("province", address.province);
                        setGettingLocation(false);
                      },
                      () => {
                        alert("Location access denied.");
                        setGettingLocation(false);
                      }
                    );
                  }}
                  disabled={gettingLocation}
                >
                  {gettingLocation ? "Getting Location..." : "Get My Location"}
                </Buttons>
                  </div>
                  <div className="w-full h-[200px] rounded-xl overflow-hidden">
                    {isLoading ? (
                      <div className="w-full h-full rounded-xl bg-gray-200 flex flex-col gap-3 items-center justify-center">
                        <div className="loader"></div>
                        <p>Loading Map...</p>
                      </div>
                    ) : (
                      <MapContainer
                        center={[coordinates.latitude, coordinates.longitude]}
                        zoom={13}
                        className="leaflet-container"
                        ref={mapRef}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker
                          position={[
                            coordinates.latitude,
                            coordinates.longitude,
                          ]}
                        />
                        <MapClickHandler setFieldValue={setFieldValue} />
                      </MapContainer>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="flex items-center gap-1 font-semibold text-sm text-gray-400"
                  >
                    <Field type="checkbox" name="isPrimary" />
                    Jadikan Alamat Utama
                  </label>
                  <div className="flex items-center gap-5">
                    <Buttons type="submit" disabled={isSubmitting || isLoading}>
                      {isSubmitting ? "Updating..." : "Update"}
                    </Buttons>
                    <Buttons
                      className="bg-gray-300 text-gray-600"
                      onClick={onClose}
                    >
                      Batal
                    </Buttons>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditAddress;