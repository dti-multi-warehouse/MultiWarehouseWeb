"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useConfirmPasswordReset } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ResetPasswordConfirmSchema = Yup.object().shape({
  newPassword: Yup.string().required("Password is required"),
});

const ResetPasswordConfirmForm: React.FC<{ email: string; token: string }> = ({
  email,
  token,
}) => {
  const confirmPasswordReset = useConfirmPasswordReset();
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
        initialValues={{ newPassword: "" }}
        validationSchema={ResetPasswordConfirmSchema}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            email: email,
            token: token,
            newPassword: values.newPassword,
          };

          confirmPasswordReset.mutate(data, {
            onSuccess: () => {
              setDialogMessage("Your password has been reset successfully.");
              setDialogOpen(true);
              setSubmitting(false);
              router.push("/sign-in");
            },
            onError: (error: any) => {
              const errorMessage = error.response?.data?.message || error.message;
              alert(`Failed to reset password: ${errorMessage}`);
              setSubmitting(false);
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-sm font-medium">New Password</label>
              <div style={{ position: "relative" }} className="">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Input your new password"
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
                name="newPassword"
                component="div"
                className="text-sm text-red-500 w-fit"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        )}
      </Formik>
      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        cancelVisibility="hidden"
      />
    </>
  );
};

export default ResetPasswordConfirmForm;
