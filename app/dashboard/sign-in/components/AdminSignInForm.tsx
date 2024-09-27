"use client";

import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const AdminSignInForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const login = useLoginUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, { setSubmitting }) => {
          login.mutate(
            { email: values.email, password: values.password },
            {
              onSuccess: (data) => {
                console.log('Login success data:', data);
                if (data.role === "ADMIN") {
                  router.push("/dashboard");
                } else if (data.role === "WAREHOUSE_ADMIN") {
                  router.push("/dashboard/stocks");
                } else {
                  setDialogMessage("This login is restricted to admins.");
                  setDialogOpen(true);
                  setSubmitting(false);
                  return;
                }
                setSubmitting(false);
              },
              onError: (error: any) => {
                setDialogMessage("Login failed. Please check your credentials.");
                setDialogOpen(true);
                setSubmitting(false);
              },
            }
          );
        }}
      >
        <Form className="flex flex-col gap-y-5 items-center justify-center w-full">
          <div className="flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Admin Email</label>
            <Field
              type="email"
              name="email"
              placeholder="Input your admin email"
              className="w-full p-1 border-2 rounded-lg border-gray-300"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-500"
            />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Input your password"
                className="w-full p-1 border-2 rounded-lg border-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-sm text-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg transition-all duration-500 hover:shadow-lg"
          >
            Admin Sign In
          </button>
        </Form>
      </Formik>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        title={dialogMessage}
      />
    </>
  );
};

export default AdminSignInForm;
