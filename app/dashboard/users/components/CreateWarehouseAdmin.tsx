"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AlertDialog from "@/components/AlertDialog";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useCreateWarehouseAdmin } from "@/hooks/useAdmin";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Buttons";

const CreateWarehouseAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const createWarehouseAdminMutation = useCreateWarehouseAdmin();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const CreateWarehouseAdminSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    avatar: Yup.mixed()
      .nullable()
      .test("fileSize", "File size too large", (value: any) => {
        return !value || (value && value.size <= 1 * 1024 * 1024);
      })
      .test("fileType", "Unsupported file format", (value: any) => {
        return (
          !value ||
          (value &&
            ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
              value.type
            ))
        );
      }),
  });

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="py-3 px-5 md:px-10 bg-red-600 text-white rounded-lg flex justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all xl:max-w-[220px] xl:w-full text-sm duration-500">
        Add Admin
      </DialogTrigger>
      <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center p-5 pb-0">
            Add Warehouse Admin
          </DialogTitle>
          <DialogDescription className="text-center p-5">
            Fill in the details to create a new warehouse admin.
          </DialogDescription>
          <hr className="border-dashed border-gray-800" />
        </DialogHeader>

        <AlertDialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          title="Admin Creation"
          description={alertMessage}
          actionLabel="OK"
          cancelVisibility="hidden"
        />

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            avatar: null,
          }}
          validationSchema={CreateWarehouseAdminSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("username", values.username);
            formData.append("email", values.email);
            formData.append("password", values.password);
            if (values.avatar) {
              formData.append("avatar", values.avatar);
            }

            createWarehouseAdminMutation.mutate(formData, {
              onSuccess: () => {
                setAlertMessage("Warehouse admin created successfully!");
                setAlertOpen(true);
                setDialogOpen(false);
                window.location.reload();
              },
              onError: (error) => {
                console.error("Error creating warehouse admin:", error);
                setAlertMessage("Failed to create warehouse admin.");
                setAlertOpen(true);
              },
              onSettled: () => {
                setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="p-5 flex flex-col gap-5">
              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    className="w-full p-1 border-2 rounded-lg border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                <div className="text-red-600 text-xs">
                  <ErrorMessage name="password" />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="avatar"
                >
                  Upload Avatar (Optional)
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  onChange={(event) => {
                    if (
                      event.currentTarget?.files &&
                      event.currentTarget.files.length > 0
                    ) {
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    } else {
                      setFieldValue("avatar", null);
                    }
                  }}
                  className="w-full p-1 border-2 rounded-lg border-gray-300"
                />
                <p className="text-xs font-semibold text-red-500">
                  * File must be less than 1 MB and in JPG, JPEG, PNG, or GIF
                  format.
                </p>
              </div>

              <div className="flex items-center justify-end gap-5">
                <Buttons type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </Buttons>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWarehouseAdmin;
