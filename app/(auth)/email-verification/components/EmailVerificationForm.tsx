"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useConfirmRegistration } from "@/hooks/useUser";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AlertDialog from "@/components/AlertDialog";
import { useRouter } from "next/navigation";
import React from "react";

const EmailVerifSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
});

const EmailVerificationForm: React.FC<{ email: string; token: string }> = ({
  email,
  token,
}) => {
  const confirmRegistration = useConfirmRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={EmailVerifSchema}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            email: email,
            password: values.password, 
            token: token,
          };

          confirmRegistration.mutate(data, {
            onSuccess: () => {
              alert("Registration confirmed!");
              setSubmitting(false);
              router.push('/sign-in')
            },
            onError: (error: any) => {
              const errorMessage = error.response?.data?.message || error.message;
              if (errorMessage.includes("Token expired")) {
                setDialogMessage("Your verification link has expired. A new verification email has been sent. Please check your email.");
                setDialogOpen(true);
              } else {
                alert(`Failed to confirm registration: ${errorMessage}`);
              }
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500 w-fit"
              />
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
      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
      />
    </>
  );
};

export default EmailVerificationForm;
