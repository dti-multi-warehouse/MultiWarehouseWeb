"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Please input password correctly"),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          console.log(values);
          router.push("/");
        }}
      >
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
          <div className=" flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Registered Email</label>
            <Field 
                type="email" 
                name="email" 
                placeholder="Input your email"
                className="w-full p-1 border-2 rounded-lg border-gray-300"
            />
            <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Password</label>
            <div style={{ position: "relative" }} className="">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Input your password"
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
            <ErrorMessage name="password" component="div" className="text-sm text-red-500 w-fit" />
          </div>
          <button type="submit" className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium">Sign In</button>
        </Form>
      </Formik>
    </>
  );
};

export default SignInForm;
