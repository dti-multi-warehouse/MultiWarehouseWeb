"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRequestPasswordReset } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ResetPasswordForm: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const requestPasswordReset = useRequestPasswordReset();

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={(values, { setSubmitting }) => {
          requestPasswordReset.mutate(
            { email: values.email },
            {
              onSuccess: (data) => {
                setDialogMessage("Password reset email sent. Please check your email.");
                setDialogOpen(true);
                setSubmitting(false);
              },
              onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "Failed to send password reset email";
                
                // Check if the error is due to a social login account
                if (error.response?.status === 403) {
                  setDialogMessage("Cannot reset password for a social login account.");
                } else {
                  setDialogMessage(errorMessage);
                }
                
                setDialogOpen(true);
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-y-5 items-center justify-center w-full">
            <div className="flex flex-col gap-y-1 w-full">
              <label className="text-sm font-medium">Email:</label>
              <Field
                type="email"
                name="email"
                placeholder="Input your email"
                className="w-full p-1 border-2 rounded-lg border-gray-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500 w-fit"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white hover:scale-105 py-2 rounded-xl transition-all duration-500 hover:shadow-md hover:shadow-gray-300 text-sm font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Reset Password"}
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

export default ResetPasswordForm;
