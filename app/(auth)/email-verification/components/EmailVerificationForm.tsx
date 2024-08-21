"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useConfirmRegistration } from "@/hooks/useUser";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const EmailVerifSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const EmailVerificationForm: React.FC<{ email: string; token: string }> = ({ email, token }) => {
  const confirmRegistration = useConfirmRegistration();
  const [showPassword, setShowPassword] = useState(false);

  console.log("Email received by form:", email); // Log the email prop
  console.log("Token received by form:", token); // Log the token prop

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Formik
      initialValues={{ password: "" }}
      validationSchema={EmailVerifSchema}
      onSubmit={(values, { setSubmitting }) => {
        const data = {
          email: email, // Explicitly pass the email
          password: values.password, // From form input
          token: token // Explicitly pass the token
        };

        console.log("Submitting confirmation data:", data); // Log the data before submitting
        confirmRegistration.mutate(data, {
          onSuccess: () => {
            alert("Registration confirmed!");
            setSubmitting(false);
          },
          onError: (error: any) => {
            console.error("Error during confirmation:", error.response?.data || error.message);
            alert(`Failed to confirm registration: ${error.response?.data?.message || error.message}`);
            setSubmitting(false);
          },
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
          <div className="flex flex-col gap-y-1 w-full">
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm Password"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EmailVerificationForm;