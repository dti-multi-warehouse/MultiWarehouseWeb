"use client"; 

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";

const SignUpSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
});

const SignUpForm: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();
  const registerUser = useRegisterUser();

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/sign-in");
  };

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          registerUser.mutate({ email: values.email }, {
            onSuccess: (data) => {
              if (data.message.includes("already registered but not verified")) {
                setDialogMessage("This email is already registered but not verified. Please check your email to verify your account.");
              } else {
                setDialogMessage("Verification email sent. Please check your email.");
              }
              setDialogOpen(true);
            },
            onError: () => alert("Failed to send verification email"),
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
        <Form className="flex flex-col gap-y-5 items-start justify-center w-full">
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
              {isSubmitting ? "Loading..." : "Verify Email"}
          </button>
        </Form>
         )}
      </Formik>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
      />
    </>
  );
};

export default SignUpForm;
