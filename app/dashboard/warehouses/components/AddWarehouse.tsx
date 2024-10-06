"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCreateWarehouse, useAssignWarehouseAdmin } from "@/hooks/useWarehouse";
import Buttons from "@/components/Buttons";
import AdminAssignee from "./AdminAssignee";
import Image from "next/image";
import React from "react";

const AddWarehouse: React.FC = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: -6.2,
    longitude: 106.816666,
  });
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<any>(null);

  const createWarehouseMutation = useCreateWarehouse();
  const assignWarehouseAdminMutation = useAssignWarehouseAdmin();
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null); // Track selected admin

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}&language=id`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { components } = data.results[0];
        const street = components.road || components.neighbourhood || "";
        const city = components.city || components.town || "";
        const province = components.state || components.region || "";
        return { street, city, province };
      } else {
        alert("Unable to find the address.");
      }
    } catch (error) {
      console.error("Error fetching reverse geolocation data:", error);
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

  return (
    <>
      <Dialog>
        <DialogTrigger className="py-1 px-5 bg-red-600 text-white rounded-xl flex justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500">
          Add Warehouse
        </DialogTrigger>
        <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center p-5">Add Warehouse</DialogTitle>
            <hr className="border-dashed border-gray-800" />
            <Formik
              initialValues={{
                name: "",
                street: "",
                city: "",
                province: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required"),
                street: Yup.string().required("Street is required"),
                city: Yup.string().required("City is required"),
                province: Yup.string().required("Province is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const payload = {
                  name: values.name,
                  street: values.street,
                  city: values.city,
                  province: values.province,
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                };

                createWarehouseMutation.mutate(payload, {
                  onSuccess: (data: any) => {
                    if (selectedAdmin) {
                      // Assign the selected admin to the warehouse after warehouse creation
                      assignWarehouseAdminMutation.mutate({
                        warehouseId: data.id,
                        userId: selectedAdmin.id,
                      });
                    }
                    alert("Warehouse created successfully!");
                  },
                  onError: () => {
                    alert("Failed to create warehouse.");
                  },
                  onSettled: () => {
                    setSubmitting(false);
                  },
                });
              }}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form className="p-5 flex flex-col gap-5">
                  <div>
                    <label>Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Warehouse Name"
                      className="w-full p-1 border-2 rounded-lg border-gray-300"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <label>Street</label>
                    <Field
                      type="text"
                      name="street"
                      placeholder="Street Address"
                      className="w-full p-1 border-2 rounded-lg border-gray-300"
                    />
                    <ErrorMessage
                      name="street"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex gap-5">
                    <div>
                      <label>City</label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="City"
                        className="w-full p-1 border-2 rounded-lg border-gray-300"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div>
                      <label>Province</label>
                      <Field
                        type="text"
                        name="province"
                        placeholder="Province"
                        className="w-full p-1 border-2 rounded-lg border-gray-300"
                      />
                      <ErrorMessage
                        name="province"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="w-full h-[200px] rounded-xl overflow-hidden">
                    {isLoading ? (
                      <p>Loading map...</p>
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

                  <Buttons type="submit" disabled={isSubmitting || isLoading}>
                    {isSubmitting ? "Saving..." : "Save"}
                  </Buttons>
                </Form>
              )}
            </Formik>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddWarehouse;