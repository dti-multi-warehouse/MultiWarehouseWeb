"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const EmailVerifSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const EmailVerificationForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={EmailVerifSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
          <div className=" flex flex-col gap-y-1 w-full">
            <label className="text-sm font-medium">Set Password</label>
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
          <button
            type="submit"
            className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium"
          >
            Confirm Password
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default EmailVerificationForm;
